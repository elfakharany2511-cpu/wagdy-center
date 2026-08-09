'use client';
import { useState } from 'react';

export default function AttendancePage() {
  const [center, setCenter] = useState('');
  const [grade, setGrade] = useState('');

  return (
    <div className="p-6 max-w-6xl mx-auto">
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

      {/* جدول تسجيل الطلاب */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 text-right">اسم الطالب</th>
              <th className="p-3 text-center">حالة الحضور</th>
              <th className="p-3 text-center">حالة الامتحان</th>
              <th className="p-3 text-center">تقييم المستوى</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3 font-semibold text-gray-800">محمد أحمد (مثال)</td>
              <td className="p-3 text-center">
                <select className="p-2 border rounded bg-white">
                  <option value="present">حاضر</option>
                  <option value="absent">غائب</option>
                  <option value="late">متأخر</option>
                </select>
              </td>
              <td className="p-3 text-center">
                <select className="p-2 border rounded bg-white">
                  <option value="tested">امتحن</option>
                  <option value="not_tested">لم يمتحن</option>
                </select>
              </td>
              <td className="p-3 text-center">
                <select className="p-2 border rounded bg-white">
                  <option value="excellent">ممتاز</option>
                  <option value="good">جيد</option>
                  <option value="average">متوسط</option>
                  <option value="poor">ضعيف</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl text-lg font-bold shadow-md transition-all">
        حفظ بيانات الحضور والمتابعة في قاعدة البيانات
      </button>
    </div>
  );
}