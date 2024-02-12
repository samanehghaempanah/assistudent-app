import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UploadFileService {

    open(base64 = false, accept = 'image/*') {
        return new Promise((resolve, reject) => {
            var input = document.createElement('INPUT');
            input.style.display = 'none';
            input.setAttribute('type', 'file');
            input.setAttribute('accept', accept)
            document.body.appendChild(input);
            input.click();
            input.onchange = (event: any) => {
                const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
                const pattern = accept;
                const reader = new FileReader();
                if (!file.type.match(pattern)) {
                    alert('invalid format');
                    reject();
                }
                if(base64){
                    reader.onload = (event) => {
                        input.remove();
                        resolve(event.target);
                    };
                    reader.readAsDataURL(file);
                } else {
                    resolve(file);
                }
            }
        })
    }
}