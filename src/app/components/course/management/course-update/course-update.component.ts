import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CourseRegisterRequest} from '../../../../models/course';
import {CourseService} from '../../../../service/course.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-update',
  templateUrl: './course-update.component.html',
  styleUrls: ['./course-update.component.css']
})
export class CourseUpdateComponent implements OnInit {
  // @ts-ignore
  @ViewChild('inputFile', {static: false}) inputFile: ElementRef;

  defaultImage = 'assets/course-image.png';

  formCreation: CourseRegisterRequest;
  currentCourseName: string;
  srcResult: string;

  constructor(private courseService: CourseService,
              private router: Router) {
    this.formCreation = new CourseRegisterRequest();
    this.currentCourseName = undefined;
  }

  ngOnInit() {
    const savedCourse = this.courseService.userForUpdate;

    this.formCreation.courseName = savedCourse.courseName;
    this.currentCourseName = savedCourse.courseName;

    this.formCreation.courseResume = savedCourse.courseResume;

    this.formCreation.courseImage = savedCourse.image;
    this.srcResult = (!this.fieldIsNullOrUndefined(savedCourse.image)) ? ('data:image/jpeg;base64,' + savedCourse.image) : this.defaultImage;

    this.formCreation.courseAuthor = savedCourse.courseAuthor;
  }

  // tslint:disable-next-line:ban-types
  fieldIsNullOrUndefined(value: Object): boolean {
    return (value === undefined) || (value === null);
  }

  select() {
    const inputFile = this.inputFile.nativeElement as HTMLInputElement;

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
        this.formCreation.courseImage = this.srcResult.split(',')[1];
      };

      reader.readAsDataURL(inputFile.files[0]);
    }
  }

  async save() {
    Swal.fire('Actualizando...', 'Espere un momento por favor.', 'info');
    Swal.showLoading();
    if (!this.fieldIsNullOrUndefined(this.formCreation.courseName) || !this.fieldIsNullOrUndefined(this.formCreation.courseResume)) {
      await this.courseService.update(this.formCreation, this.currentCourseName).toPromise().then(value => {
        Swal.close();
        Swal.fire('¡Genial!', 'El registro se actualizó con éxito', 'success');
        this.router.navigate(['course']);
      }).catch(err => {
        console.error('Error: ', err);
        Swal.close();
        Swal.fire({
          title: '¡Oh no!',
          text: 'Ha ocurrido un error al registrar: ' + err.getMessage,
          type: 'error',
          timer: 3000
        });
      });
    } else {
      Swal.close();
      Swal.fire({
        title: 'Validación',
        text: 'Debe llenar los campos nombre y resumen para guardar.' ,
        type: 'error',
        timer: 3000
      });
    }
  }

}
