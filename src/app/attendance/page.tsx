'use client';
import { useState } from 'react';

export default function AttendancePage() {
  const [center, setCenter] = useState('');
  const [grade, setGrade] = useState('');
  const [studentName, setStudentName] = useState('');

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">سجل حضور ومتابعة الطلاب</h1>
      
      {/* اختيارات السنتر والمرحلة */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-gray-50 p-4 rounded-xl shadow-sm">
        <div>
          <label className="block mb-2 font-bold text-gray-700">اختر السنتر:</label>
          <select 
            value={center} 
            onChange={(e) => setCenter(e.target.value)}
            className="w-full p-3 border rounded-lg bg-white"
          >
            <option value="">-- اختر السنتر --</option>
            <option value="center1">سنتر جوجل 1</option>
            <option value="center2">سنتر جوجل 2</option>
            <option value="center3">سنتر جوجل 3</option>
            <option value="sunrise">سنتر صن رايز</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-bold text-gray-700">اختر المرحلة:</label>
          <select 
            value={grade} 
            onChange={(e) => setGrade(e.target.value)}
            className="w-full p-3 border rounded-lg bg-white"
          >
            <option value="">-- اختر المرحلة الدراسية --</option>
            <option value="prep1">أولي إعدادي</option>
            <option value="prep2">تانية إعدادي</option>
            <option value="prep3">تالتة إعدادي</option>
            <option value="sec1">أولي ثانوي</option>
            <option value="sec2">تانية ثانوي</option>
            <option value="sec3_math">تالتة ثانوى رياضة</option>
            <option value="sec3_stats">تالتة ثانوى إحصاء</option>
          </select>
        </div>
      </div>

      {/* نموذج تسجيل طالب فردي بخانة كتابة واضحة */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">اسم الطالب:</label>
          <input 
            type="text" 
            placeholder="اكتب اسم الطالب هنا..."
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block mb-2 font-bold text-gray-700">حالة الحضور:</label>
            <select className="w-full p-3 border rounded-lg bg-white">
              <option value="present">حاضر</option>
              <option value="absent">غائب</option>
              <option value="late">متأخر</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-bold text-gray-700">حالة الامتحان:</label>
            <select className="w-full p-3 border rounded-lg bg-white">
              <option value="tested">امتحن</option>
              <option value="not_tested">لم يمتحن</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-bold text-gray-700">تقييم المستوى:</label>
            <select className="w-full p-3 border rounded-lg bg-white">
              <option value="excellent">ممتاز</option>
              <option value="good">جيد</option>
              <option value="average">متوسط</option>
              <option value="poor">ضعيف</option>
            </select>
          </div>
        </div>
      </div>

      <button className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl text-lg font-bold shadow-md transition-all">
        حفظ بيانات الطالب في قاعدة البيانات
      </button>
    </div>
  );
}