# Image Handling in Blogify

This document explains how image upload, storage, retrieval, and deletion are handled throughout the Blogify application.

---

## Overview

Blogify uses a **two-stage image pipeline**:

1. **Multer** (Node.js middleware) temporarily saves the uploaded file to the local server filesystem.
2. **Cloudinary** (cloud storage) receives the file from the temp directory, stores it on a CDN, and returns a permanent URL.

Only the **Cloudinary URL** is persisted in MongoDB — no binary image data is stored in the database.

---

## Images in the Application

There are two types of images:

| Type | Field | Model | Uploaded By |
|---|---|---|---|
| Blog thumbnail | `thumbnail` | `Blog` | Author at create/edit time |
| User profile picture | `profilePic` | `User` | User on their profile page |

---

## File-by-File Walkthrough

### 1. Multer Middleware — `server/middlewares/multerMiddleware.js`

Multer intercepts `multipart/form-data` requests and saves the file to a temporary local directory before any controller code runs.

```js
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/temp-Images"); // temporary holding folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);      // keep original filename
  },
});

export const upload = multer({ storage });
```

- The directory `./public/temp-Images/` is created automatically if it does not exist.
- After the file lands here, `req.file.path` contains its local path, which is passed to Cloudinary.

---

### 2. Cloudinary Utility — `server/utils/cloudinary.js`

Two helper functions wrap the Cloudinary SDK:

#### `handlePhotoUpload(localFilePath)`

```js
const handlePhotoUpload = async (localFilePath) => {
  const response = await cloudinary.uploader.upload(localFilePath, {
    resource_type: "auto", // auto-detect image/video/raw
    folder: "temp",        // uploaded into the "temp" folder in Cloudinary
  });
  fs.unlink(localFilePath, () => {}); // delete local temp file
  return response; // response.secure_url is the CDN URL
};
```

#### `handlePhotoDelete(oldUrl)`

```js
const handlePhotoDelete = async (oldUrl) => {
  const publicId = extractPublicId(oldUrl); // parse the public_id from the URL
  const result = await cloudinary.uploader.destroy(publicId);
  return result;
};
```

`extractPublicId` strips the version prefix and file extension from a Cloudinary URL to recover the `public_id`:

```
https://res.cloudinary.com/<cloud>/image/upload/v1234567890/temp/filename.jpg
                                                              └─────────────┘
                                                              public_id = "temp/filename"
```

**Required environment variables** (`server/.env`):
```
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

### 3. Backend Routes

Both image-accepting routes use `upload.single(<fieldName>)` from the Multer middleware **before** the controller:

```js
// server/routes/blogRoutes.js
router.post("/",    verifyJWT, upload.single("thumbnail"), createBlog);
router.patch("/:id", verifyJWT, upload.single("thumbnail"), updateBlog);

// server/routes/userRoutes.js (auth routes)
router.patch("/update", verifyJWT, upload.single("profilePic"), updateUser);
```

`verifyJWT` runs first so unauthenticated requests never reach the upload logic.

---

### 4. Blog Controller — `server/controllers/blogController.js`

#### Create Blog

```js
let thumbnail = "";
if (req.file) {
  const uploadResult = await handlePhotoUpload(req.file.path);
  thumbnail = uploadResult.secure_url;
}
if (!thumbnail) thumbnail = "default_thumbnail_url";

const newBlog = await Blog.create({ title, content, thumbnail, category, author });
```

#### Update Blog

When a new thumbnail is provided the **old image is deleted first**, then the new one is uploaded:

```js
if (req.file) {
  if (blog.thumbnail) await handlePhotoDelete(blog.thumbnail);           // remove old
  const cloudinaryResponse = await handlePhotoUpload(req.file.path);    // upload new
  blog.thumbnail = cloudinaryResponse.secure_url;
}
await blog.save();
```

#### Delete Blog

When a blog is deleted its thumbnail is also removed from Cloudinary:

```js
await Blog.findByIdAndDelete(req.params.id);
if (blog.thumbnail) await handlePhotoDelete(blog.thumbnail);
```

---

### 5. User Controller — `server/controllers/userController.js`

#### Update Profile Picture

Same pattern as blog update — old picture deleted before new one uploaded:

```js
if (req.file) {
  if (user.profilePic) await handlePhotoDelete(user.profilePic);
  const cloudinaryResponse = await handlePhotoUpload(req.file.path);
  user.profilePic = cloudinaryResponse.secure_url;
}
await user.save({ validateBeforeSave: false });
```

#### Delete Account

Profile picture is cleaned up from Cloudinary when the user account is deleted:

```js
const oldUrl = req.user.profilePic;
await User.findByIdAndDelete(req.user._id);
await handlePhotoDelete(oldUrl);
```

---

### 6. Database Models

Both models store a **plain string URL** pointing to the Cloudinary resource.

**`server/models/blogModel.js`**
```js
thumbnail: { type: String, default: "" }
```

**`server/models/userModel.js`**
```js
profilePic: {
  type: String,
  default: "https://militaryhealthinstitute.org/.../blank-profile-picture-png.png",
}
```

---

### 7. Frontend — Upload

#### Blog Thumbnail (`client/src/pages/CreateBlogPost.jsx` & `EditBlog.jsx`)

- `<input type="file" accept="image/*" />` triggers file selection.
- Drag-and-drop is also supported.
- **Client-side validation** before the request is sent:
  - File size must be ≤ 2 MB.
- Preview is shown immediately using `URL.createObjectURL(file)`.
- The file is added to a `FormData` object alongside the text fields:

```js
const submitData = new FormData();
submitData.append("title", formData.title);
submitData.append("content", formData.content);
submitData.append("category", formData.category);
submitData.append("thumbnail", formData.thumbnail); // File object
```

#### Profile Picture (`client/src/pages/Profile.jsx`)

- Circular image with an overlay "+" icon acts as the upload trigger.
- **Client-side validation:**
  - Must be an image (`file.type.startsWith("image/")`).
  - File size must be ≤ 2 MB.
- Only appended to `FormData` if the user actually picked a new file:

```js
const data = new FormData();
data.append("userName", userName);
if (profilePic instanceof File) {
  data.append("profilePic", profilePic);
}
```

---

### 8. Frontend — API Calls

The browser `fetch` API sends the `FormData` body directly (no `Content-Type` header set manually — the browser sets the correct `multipart/form-data` boundary automatically).

```js
// client/src/api/blogApi.js
const res = await fetch(`${BASE_URL}/`, {
  method: "POST",
  credentials: "include", // sends JWT cookie
  body: formData,
});

// client/src/api/authApi.js
const res = await fetch(`${BASE_URL}/update`, {
  method: "PATCH",
  credentials: "include",
  body: formData,
});
```

---

### 9. Frontend — Display

Components receive the Cloudinary URL from the Redux store (populated after an API call) and render it directly in an `<img>` tag:

```jsx
// client/src/components/BlogCard.jsx
<img src={thumbnail} alt={title} className="object-cover w-full h-full" />
<img src={authorPic} alt={authorName} className="w-6 h-6 rounded-full object-cover" />
```

Cloudinary serves images via a global CDN, so no proxying through the Node.js server is needed at display time.

---

## Complete Lifecycle

### Blog Thumbnail — Create

```
User selects file (browser)
  → client-side size validation
  → URL.createObjectURL() for instant preview
  → FormData built with file + text fields
  → POST /api/v1/blogs/  (multipart/form-data, JWT cookie)
      → verifyJWT middleware (authenticate user)
      → upload.single("thumbnail") middleware (Multer saves to ./public/temp-Images/)
      → createBlog controller
          → handlePhotoUpload(req.file.path)
              → cloudinary.uploader.upload(...)  →  Cloudinary CDN
              → fs.unlink(localPath)             →  temp file removed
          → Blog.create({ ..., thumbnail: secure_url })  →  MongoDB
  ← response: { blog: { thumbnail: "https://res.cloudinary.com/..." } }
  → Redux store updated
  → <img src={thumbnail} /> displays image from Cloudinary CDN
```

### Blog Thumbnail — Update

```
User selects new file
  → PATCH /api/v1/blogs/:id
      → handlePhotoDelete(old_url)  →  Cloudinary deletes old image
      → handlePhotoUpload(new_path) →  Cloudinary stores new image
      → blog.save()                 →  MongoDB updated with new URL
```

### Blog / User — Delete

```
DELETE /api/v1/blogs/:id  or  DELETE /api/v1/auth/:id
  → MongoDB document deleted
  → handlePhotoDelete(url)  →  Cloudinary image removed
```

---

## Key Points

- **No binary data in MongoDB** — only string URLs.
- **Temp files are always cleaned up** — either after a successful Cloudinary upload or after a failed one.
- **Old images are deleted** from Cloudinary whenever they are replaced or the owning document is deleted, keeping storage lean.
- **Authorization is enforced** before any upload logic runs (`verifyJWT` middleware).
- **Client-side validation** (type + 2 MB size limit) provides fast feedback before a network request is made.
- **No server-side image processing** (resize, compress, crop) — the application relies on Cloudinary's default handling.
