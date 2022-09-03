export class audioUpload {
    pres_audio: string;
    constructor(file: Array<string>) {
        file.map((audio, index) => {
            this[`pres_audio`] = audio;
        });
       
    }
}