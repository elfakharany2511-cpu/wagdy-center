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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // دالة لجلب الطلاب المسجلين لنفس السنتر والمرحلة
  const fetchStudents = async () => {
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('center', center)
      .eq('grade', grade);

    if (error) {
      console.error(error);
    } else {
      setStudents(data || []);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [center, grade]);

  // دالة الحفظ في قاعدة البيانات
  const handleSave = async () => {
    if (!studentName.trim()) {
      setMessage('⚠️ من فضلك اكتب اسم الطالب أولاً.');
      return;
    }

    setLoading(true);
    setMessage('');

    const { error } = await supabase
      .from('attendance')
      .insert([
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
      console.error(error);
      setMessage('❌ حصل خطأ أثناء الحفظ. تأكد من إعدادات الجدول.');
    } else {
      setMessage('✅ تم حفظ بيانات الطالب بنجاح!');
      setStudentName(''); // تفريغ خانة الاسم لإدخال طالب جديد
      fetchStudents(); // تحديث الجدول تلقائياً
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-gray-50 p-4 rounded-xl shadow-sm">
        <div>
          <label className="block mb-2 font-bold text-gray-700">اختر السنتر:</label>
          <select 
            value={center} 
            onChange={(e) => setCenter(e.target.value)}
            className="w-full p-3 border rounded-lg bg-white"
          >
            <option value="سنتر جوجل 1">سنتر جوجل 1</option>
            <option value="سنتر جوجل 2">سنتر جوجل 2</option>
            <option value="سنتر جوجل 3">سنتر جوجل 3</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-bold text-gray-700">اختر المرحلة:</label>
          <select 
            value={grade} 
            onChange={(e) => setGrade(e.target.value)}
            className="w-full p-3 border rounded-lg bg-white"
          >
            <option value="تالتة إعدادي">تالتة إعدادي</option>
            <option value="تانية إعدادي">تانية إعدادي</option>
            <option value="أولي إعدادي">أولي إعدادي</option>
          </select>
        </div>
      </div>

      {/* نموذج تسجيل طالب فردي */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 border">
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
          className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl text-lg font-bold shadow-md transition-all disabled:opacity-50"
        >
          {loading ? 'جاري الحفظ...' : 'حفظ بيانات الطالب في قاعدة البيانات'}
        </button>
      </div>

      {/* جدول عرض الطلاب المسجلين لنفس السنتر والمرحلة */}
      <div className="bg-white p-6 rounded-xl shadow-md border">
        <h2 className="text-xl font-bold mb-4 text-gray-800">قائمة طلاب: {center} ({grade})</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3">اسم الطالب</th>
                <th className="p-3">الحضور</th>
                <th className="p-3">الامتحان</th>
                <th className="p-3">المستوى</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-semibold">{s.student_name}</td>
                  <td className="p-3">{s.attendance_status}</td>
                  <td className="p-3">{s.exam_status}</td>
                  <td className="p-3">{s.level_evaluation}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {students.length === 0 && (
            <p className="text-center text-gray-500 py-6">لا يوجد طلاب مسجلين حتى الآن لهذه المرحلة والسنتر.</p>
          )}
        </div>
      </div>
    </div>
  );
}