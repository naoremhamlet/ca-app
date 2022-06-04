import generatePdfThumbnails from 'pdf-thumbnails-generator';

export default async function thumbnail(file) {
    try {
        const thumbnails = await generatePdfThumbnails(file, 100);
        return thumbnails[0].thumbnail
    } catch (err) {
        console.error(err);
    }
    return null;
}