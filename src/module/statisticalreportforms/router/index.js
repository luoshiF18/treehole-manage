import Home from '@/module/home/page/home.vue';
import student_information_statistics from  '@/module/statisticalreportforms/page/studentInfo/student_information_statistics.vue';
import student_course_list from  '@/module/statisticalreportforms/page/studentInfo/student_course_list.vue';
import student_teacher from  '@/module/statisticalreportforms/page/studentInfo/student_teacher.vue';
import class_information_statistics from  '@/module/statisticalreportforms/page/classInfo/class_information_statistics.vue';
import class_student from  '@/module/statisticalreportforms/page/classInfo/class_student.vue';
import class_course from  '@/module/statisticalreportforms/page/classInfo/class_course.vue';
import class_teacher from  '@/module/statisticalreportforms/page/classInfo/class_teacher.vue';
import leave_information_statistics from  '@/module/statisticalreportforms/page/leaveInfo/leave_information_statistics.vue';
import student_list from  '@/module/statisticalreportforms/page/payInfo/student_list.vue';
import payment_record from  '@/module/statisticalreportforms/page/payInfo/payment_record.vue';
import arrears_record from  '@/module/statisticalreportforms/page/payInfo/arrears_record.vue';
import payment_record_all from  '@/module/statisticalreportforms/page/payInfo/payment_record_all.vue';
import arrears_record_all from  '@/module/statisticalreportforms/page/payInfo/arrears_record_all.vue';
import teacher_information_statistics from  '@/module/statisticalreportforms/page/teacherinfo/teacher_information_statistics.vue';
import headmaster_class from  '@/module/statisticalreportforms/page/teacherinfo/headmaster_class.vue';
import teacher_course from  '@/module/statisticalreportforms/page/teacherinfo/teacher_course.vue';

export default [{
    path: '/train',
    component: Home,
    name: '统计报表',  //已级标题
    hidden: false,
    children:[
      {path:'/statisticalreportforms/page/studentInfo/student_information_statistics',        name:'学生信息统计',          component: student_information_statistics,hidden:false},
      {path:'/statisticalreportforms/page/studentInfo/student_course_list/:studentId',        name:'学生课程',          component: student_course_list,hidden:true},
      {path:'/statisticalreportforms/page/studentInfo/student_teacher/:studentId',        name:'学生课程',          component: student_teacher,hidden:true},
      {path:'/statisticalreportforms/page/classInfo/class_information_statistics',        name:'班级信息统计',          component: class_information_statistics,hidden:false},
      {path:'/statisticalreportforms/page/classInfo/class_student/:classId',        name:'班级学生统计',          component: class_student,hidden:true},
      {path:'/statisticalreportforms/page/classInfo/class_course/:classId',        name:'班级课程统计',          component: class_course,hidden:true},
      {path:'/statisticalreportforms/page/classInfo/class_teacher/:classId',        name:'班级老师统计',          component: class_teacher,hidden:true},
      {path:'/statisticalreportforms/page/teacherinfo/teacher_information_statistics',        name:'老师信息统计',          component:teacher_information_statistics ,hidden:false},
      {path:'/statisticalreportforms/page/teacherinfo/headmaster_class/:teacherId',        name:'班主任所带班级信息',          component:headmaster_class ,hidden:true},
      {path:'/statisticalreportforms/page/teacherinfo/teacher_course/:teacherId',        name:'老师所教课程信息',          component:teacher_course ,hidden:true},

      {path:'/statisticalreportforms/page/leaveInfo/leave_information_statistics/',        name:'请假信息统计',          component: leave_information_statistics ,hidden:false},
      {path:'/statisticalreportforms/page/payInfo/student_list',        name:'交费信息统计',          component: student_list ,hidden:false},
      {path:'/statisticalreportforms/page/payInfo/payment_record/:costStudentId',        name:'交费记录',          component: payment_record ,hidden:true},
      {path:'/statisticalreportforms/page/payInfo/arrears_record/:costStudentId',        name:'欠费记录',          component: arrears_record ,hidden:true},
      {path:'/statisticalreportforms/page/payInfo/payment_record_all',        name:'所有学生的交费记录',          component: payment_record_all ,hidden:true},
      {path:'/statisticalreportforms/page/payInfo/arrears_record_all',        name:'所有学生的欠费记录',          component: arrears_record_all ,hidden:true},

    ]
  }
]
