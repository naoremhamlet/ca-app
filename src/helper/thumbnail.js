// import generatePdfThumbnails from 'pdf-thumbnails-generator';
import PdfThumbnail from 'react-pdf-thumbnail';

export default async function thumbnail(file) {
    // try {
    //     const thumbnails = await generatePdfThumbnails('https://cors-anywhere.herokuapp.com/'+file, 100);
    //     return thumbnails[0].thumbnail
    // } catch (err) {
    //     console.error(err);
    // }
    // return null;
    console.log(file)
    const { error, imageUrl } = await PdfThumbnail(
        file,
        {
            fileName: 'mythumbimage.png',
            height: 200,
            width: 200,
            pageNo: 1
        }
    );
    if (!error) {
        return imageUrl;
    } else {
        return null;
    }
}