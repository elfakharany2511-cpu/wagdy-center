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

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
      setMessage('❌ حصل خطأ أثناء الحفظ.');
    } else {
      setMessage('✅ تم حفظ بيانات الطالب بنجاح!');
      setStudentName('');
      fetchStudents();
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Cairo, sans-serif' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center' }}>سجل حضور ومتابعة الطلاب</h1>
      
      {message && (
        <div style={{ padding: '12px', marginBottom: '20px', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', background: message.includes('✅') ? '#dcfce7' : '#fee2e2', color: message.includes('✅') ? '#166534' : '#991b1b' }}>
          {message}
        </div>
      )}

      {/* اختيارات السنتر والمرحلة */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px', background: '#f9fafb', padding: '16px', borderRadius: '12px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>اختر السنتر:</label>
          <select value={center} onChange={(e) => setCenter(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'white' }}>
            <option value="سنتر جوجل 1">سنتر جوجل 1</option>
            <option value="سنتر جوجل 2">سنتر جوجل 2</option>
            <option value="سنتر جوجل 3">سنتر جوجل 3</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>اختر المرحلة:</label>
          <select value={grade} onChange={(e) => setGrade(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'white' }}>
            <option value="تالتة إعدادي">تالتة إعدادي</option>
            <option value="تانية إعدادي">تانية إعدادي</option>
            <option value="أولي إعدادي">أولي إعدادي</option>
          </select>
        </div>
      </div>

      {/* نموذج تسجيل طالب */}
      <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginBottom: '24px', border: '1px solid #e5e7eb' }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>اسم الطالب:</label>
          <input 
            type="text" 
            placeholder="اكتب اسم الطالب هنا..."
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '14px' }}>الحضور:</label>
            <select value={attendanceStatus} onChange={(e) => setAttendanceStatus(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
              <option value="حاضر">حاضر</option>
              <option value="غائب">غائب</option>
              <option value="متأخر">متأخر</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '14px' }}>الامتحان:</label>
            <select value={examStatus} onChange={(e) => setExamStatus(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
              <option value="امتحن">امتحن</option>
              <option value="لم يمتحن">لم يمتحن</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '14px' }}>المستوى:</label>
            <select value={levelEvaluation} onChange={(e) => setLevelEvaluation(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
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
          style={{ width: '100%', background: '#16a34a', color: 'white', padding: '14px', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
        >
          {loading ? 'جاري الحفظ...' : 'حفظ بيانات الطالب'}
        </button>
      </div>

      {/* جدول العرض */}
      <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>قائمة طلاب: {center} ({grade})</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
          <thead>
            <tr style={{ background: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '12px' }}>اسم الطالب</th>
              <th style={{ padding: '12px' }}>الحضور</th>
              <th style={{ padding: '12px' }}>الامتحان</th>
              <th style={{ padding: '12px' }}>المستوى</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{s.student_name}</td>
                <td style={{ padding: '12px' }}>{s.attendance_status}</td>
                <td style={{ padding: '12px' }}>{s.exam_status}</td>
                <td style={{ padding: '12px' }}>{s.level_evaluation}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {students.length === 0 && (
          <p style={{ textAlign: 'center', color: '#6b7280', padding: '24px' }}>لا يوجد طلاب مسجلين حتى الآن.</p>
        )}
      </div>
    </div>
  );
}