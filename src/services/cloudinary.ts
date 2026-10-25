const CLOUD_NAME = 'vzkdbadc';
const UPLOAD_PRESET = 'velora_products';

export async function uploadProductImage(uri: string): Promise<string> {
    const formData = new FormData();

    formData.append('file', {
        uri,
        name: 'product.jpg',
        type: 'image/jpeg',
    } as unknown as Blob);
    formData.append('upload_preset', UPLOAD_PRESET);

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
    );

    if (!response.ok) {
        throw new Error('Image upload failed');
    }

    const data = await response.json();

    return data.secure_url as string;
}
