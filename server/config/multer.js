const Multer = require( 'multer' );

const options = {
    storage: Multer.diskStorage( {
        destination: ( req, file, callback ) => {
            callback(null, 'server/uploads');

        },
        filename: ( req, file, callback ) => {
            callback( null, file.originalname );
        },

    } ),
    fileFilter: ( req, file, callback ) => {

        if ( file.mimetype === 'image/png' ) {
            callback(null , true)
        } else {
            callback( null, false )

        }


    },
    limits: {fileSize: Infinity}
}
const upload = Multer( options );

module.exports = upload;