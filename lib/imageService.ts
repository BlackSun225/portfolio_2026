const IMAGE_SERVER_URL = process.env.IMAGE_SERVER_URL || 'http://localhost:3001';


export async function uploadImage(file: File): Promise<string> {

  const formData = new FormData();
  formData.append('image', file);

  console.log(`📤 Uploading: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);

  const response = await fetch(`${IMAGE_SERVER_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Upload failed');
  }

  const result = await response.json();
  console.log(`✅ Uploaded: ${result.url}`);
  
  // Return just the URL string
  return result.url;
}


export async function deleteImage(filename: string): Promise<void> {
  console.log(`🗑️ Deleting: ${filename}`);
  
  const response = await fetch(`${IMAGE_SERVER_URL}/images/${filename}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Delete failed');
  }

  console.log(`✅ Deleted: ${filename}`);
}