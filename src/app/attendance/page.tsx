'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function AttendancePage() {
  const [center, setCenter] = useState('سنتر جوجل 1');
  const [grade, setGrade] = useState('تالتة إعدادي');
  const [studentName, setStudentName] = useState('');
  
  const [attendanceStatus, setAttendanceStatus] = useState('حاضر');
  const [examStatus, setExamStatus] = useState('امتحن');
  const [levelEvaluation, setLevelEvaluation] = useState('ممتاز');

  const [students, setStudents] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // جلب الطلاب بناءً على السنتر والمرحلة المختارة
  const fetchStudents = async () => {
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('center', center)
      .eq('grade', grade);

    if (!error) {
      setStudents(data || []);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [center, grade]);

  // حفظ طالب جديد
  const handleSave = async () => {
    if (!studentName.trim()) {
      setMessage('⚠️ من فضلك اكتب اسم الطالب أولاً.');
      return;
    }

    setLoading(true);
    setMessage('');

    const { error } = await supabase.from('attendance').insert([
      { 
        student_name: studentName, 
        center: center, 
        grade: grade, 
        attendance_status: attendanceStatus, 
        exam_status: examStatus, 
        level_evaluation: levelEvaluation 
      }
    ]);

    if (error) {
      setMessage('❌ حدث خطأ أثناء الحفظ.');
    } else {
      setMessage('✅ تم حفظ الطالب بنجاح!');
      setStudentName('');
      fetchStudents();
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto" style={{ fontFamily: 'Cairo, sans-serif' }}>
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">سجل حضور ومتابعة الطلاب</h1>

      {message && (
        <div className={`p-4 mb-6 rounded-lg text-center font-bold ${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}

      {/* اختيارات السنتر والمرحلة */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-xl border">
        <div>
          <label className="block mb-2 font-bold text-gray-700">اختر السنتر:</label>
          <select value={center} onChange={(e) => setCenter(e.target.value)} className="w-full p-3 border rounded-lg bg-white">
            <option value="سنتر جوجل 1">سنتر جوجل 1</option>
            <option value="سنتر جوجل 2">سنتر جوجل 2</option>
            <option value="سنتر جوجل 3">سنتر جوجل 3</option>
            <option value="سنتر صن رايز">سنتر صن رايز</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-bold text-gray-700">اختر المرحلة:</label>
          <select value={grade} onChange={(e) => setGrade(e.target.value)} className="w-full p-3 border rounded-lg bg-white">
            <option value="أولي إعدادي">أولي إعدادي</option>
            <option value="تانية إعدادي">تانية إعدادي</option>
            <option value="تالتة إعدادي">تالتة إعدادي</option>
            <option value="أولي ثانوي">أولي ثانوي</option>
            <option value="تانية ثانوي">تانية ثانوي</option>
            <option value="تالتة ثانوى رياضة">تالتة ثانوى رياضة</option>
            <option value="تالتة ثانوى إحصاء">تالتة ثانوى إحصاء</option>
          </select>
        </div>
      </div>

      {/* نموذج إدخال بيانات الطالب */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 border">
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">اسم الطالب:</label>
          <input 
            type="text" 
            value={studentName} 
            onChange={(e) => setStudentName(e.target.value)} 
            placeholder="اكتب اسم الطالب هنا..."
            className="w-full p-3 border rounded-lg outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block mb-2 font-bold text-gray-700">حالة الحضور:</label>
            <select value={attendanceStatus} onChange={(e) => setAttendanceStatus(e.target.value)} className="w-full p-3 border rounded-lg bg-white">
              <option value="حاضر">حاضر</option>
              <option value="غائب">غائب</option>
              <option value="متأخر">متأخر</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-bold text-gray-700">حالة الامتحان:</label>
            <select value={examStatus} onChange={(e) => setExamStatus(e.target.value)} className="w-full p-3 border rounded-lg bg-white">
              <option value="امتحن">امتحن</option>
              <option value="لم يمتحن">لم يمتحن</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-bold text-gray-700">تقييم المستوى:</label>
            <select value={levelEvaluation} onChange={(e) => setLevelEvaluation(e.target.value)} className="w-full p-3 border rounded-lg bg-white">
              <option value="ممتاز">ممتاز</option>
              <option value="جيد">جيد</option>
              <option value="متوسط">متوسط</option>
              <option value="ضعيف">ضعيف</option>
            </select>
          </div>
        </div>

        <button 
          onClick={handleSave} 
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold text-lg shadow-md transition-all"
        >
          {loading ? 'جاري الحفظ...' : 'حفظ الطالب في الشيت'}
        </button>
      </div>

      {/* شيت الحضور (الجدول) */}
      <div className="bg-white p-6 rounded-xl shadow-md border">
        <h2 className="text-xl font-bold mb-4 text-gray-800">شيت الحضور والمتابعة: {center} - {grade}</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-right">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3">اسم الطالب</th>
                <th className="p-3">الحضور</th>
                <th className="p-3">الامتحان</th>
                <th className="p-3">المستوى</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-semibold">{s.student_name}</td>
                  <td className="p-3">{s.attendance_status}</td>
                  <td className="p-3">{s.exam_status}</td>
                  <td className="p-3">{s.level_evaluation}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {students.length === 0 && (
            <p className="text-center text-gray-500 py-6">لا يوجد طلاب مسجلين لهذه المرحلة والسنتر حتى الآن.</p>
          )}
        </div>
      </div>
    </div>
  );
}