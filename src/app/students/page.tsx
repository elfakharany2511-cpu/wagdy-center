"use client";
import React, { useState } from "react";

export default function StudentsPage() {
  const [students, setStudents] = useState([
    { id: 1, name: "عبدالله محمد", group: "ثالثة إعدادي - جوجل 1", phone: "01012345678", status: "منتظم" },
    { id: 2, name: "عمر أحمد", group: "ثالثة إعدادي - جوجل 1", phone: "01198765432", status: "منتظم" },
    { id: 3, name: "يوسف محمود", group: "أولى إعدادي - جوجل 2", phone: "01234567890", status: "متأخر عن الدفع" },
  ]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const addStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    const newStudentObj = {
      id: students.length + 1,
      name: newName,
      group: "ثالثة إعدادي - جوجل 1",
      phone: newPhone || "غير مسجل",
      status: "منتظم",
    };
    setStudents([...students, newStudentObj]);
    setNewName("");
    setNewPhone("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-right" dir="rtl">
      {/* رأس الصفحة */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">👨‍🎓 إدارة الطلاب والمجموعات</h1>
          <p className="text-gray-500 text-sm mt-1">إضافة ومتابعة طلاب المرحلة الإعدادية بكل سنتر</p>
        </div>
        <div className="mt-4 md:mt-0 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl font-medium text-sm">
          إجمالي الطلاب: {students.length} طالب
        </div>
      </div>

      {/* نموذج إضافة طالب جديد */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">➕ إضافة طالب جديد للمجموعة</h2>
        <form onSubmit={addStudent} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="اسم الطالب ثلاثي"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="رقم الهاتف / ولي الأمر"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-xl transition-all shadow-sm"
          >
            إضافة الطالب للمجموعة
          </button>
        </form>
      </div>

      {/* جدول عرض الطلاب */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700">
          قائمة الطلاب المسجلين
        </div>
        <div className="divide-y divide-gray-100">
          {students.map((student) => (
            <div key={student.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-gray-50/50 transition-colors">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{student.name}</h3>
                <p className="text-sm text-gray-500 mt-0.5">المجموعة: {student.group} | الهاتف: {student.phone}</p>
              </div>
              <div className="mt-3 sm:mt-0 flex items-center gap-3">
                <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                  {student.status}
                </span>
                <button className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 bg-red-50 rounded-lg">
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}