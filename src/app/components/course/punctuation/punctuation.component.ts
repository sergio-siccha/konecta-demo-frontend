import { Component, OnInit } from '@angular/core';
import {Course} from '../../../models/course';
import {CourseService} from '../../../service/course.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {ScoreService} from '../../../service/score.service';

@Component({
  selector: 'app-punctuation',
  templateUrl: './punctuation.component.html',
  styleUrls: ['./punctuation.component.css']
})
export class PunctuationComponent implements OnInit {
  voteSuccessCode = '51';

  courses: Course[];
  defaultImage = 'assets/course-image.png';

  constructor(private courseService: CourseService,
              private scoreService: ScoreService,
              private router: Router) {
    this.courses = [];
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    Swal.fire('Consultando Cursos...', 'Espere un momento por favor.', 'info');
    Swal.showLoading();

    this.courseService.getAll().subscribe(resp => {
      Swal.close();
      this.courses = resp.data as unknown as Course[];
    });
  }

  async score(evt, course: string) {
    Swal.fire('Registrando su elección...', 'Espere un momento por favor.', 'info');
    Swal.showLoading();

    const score = evt as number;

    await this.scoreService.vote(course, score).toPromise().then(value => {
      Swal.close();
      const success = value.meta.code === this.voteSuccessCode;
      Swal.fire((success) ? '¡Genial!' : '¡Error!', value.meta.message, (success) ? 'success' : 'error');
      this.getData();
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

  }

}
