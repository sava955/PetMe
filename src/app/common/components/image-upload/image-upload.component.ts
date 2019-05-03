import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ImageUploadService } from './image-upload.service';

class FileSnippet {
  pending: boolean = false;
  status: string = 'INIT';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})

export class ImageUploadComponent implements OnInit {
  @Output() imageUploaded = new EventEmitter();
  @Output() imageError = new EventEmitter();

  selectedFile: FileSnippet;

  constructor(private imageService: ImageUploadService) { }

  private onSuccess(imageUrl: string) {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
    this.imageUploaded.emit(imageUrl);
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.imageError.emit('');
  }

  ngOnInit() {
  }

  processFile(imageInput:any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    debugger;

    reader.addEventListener('load', (event:any) => {
      this.selectedFile = new FileSnippet(event.target.result, file);
      
      this.selectedFile.pending = true;
      this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (imageUrl: string) => {
          this.onSuccess(imageUrl);
        },
        (err) => {
          this.onError();
        }
      )
    });

    reader.readAsDataURL(file);
   }

}
