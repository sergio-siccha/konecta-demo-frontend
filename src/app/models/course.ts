export class Course {
  courseName: string;
  courseResume: string;
  courseAuthor: string;
  updatedAt: string;
  image: string;
  rating: number;
}

export class CourseRegisterRequest {
  courseName: string;
  courseResume: string;
  courseImage: string;
  courseAuthor: string;
}
