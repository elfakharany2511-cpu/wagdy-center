export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 font-sans text-right" dir="rtl">
      {/* رأس الصفحة */}
      <div className="mb-8 flex flex-col justify-between rounded-2xl bg-indigo-900 p-6 text-white shadow-lg sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">أهلاً أ/ وجدي 👋</h1>
          <p className="mt-1 text-indigo-200">برنامج إدارة السناتر والمجموعات التعليمية</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="rounded-xl bg-indigo-800 px-4 py-2 text-sm font-medium text-indigo-100 border border-indigo-700">
            الشهادة الإعدادية
          </span>
        </div>
      </div>

      {/* الإحصائيات السريعة */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">👨‍🎓 إجمالي الطلاب</p>
          <p className="mt-2 text-3xl font-bold text-gray-800">426</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">📚 المجموعات</p>
          <p className="mt-2 text-3xl font-bold text-indigo-600">18</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">✅ حضور اليوم</p>
          <p className="mt-2 text-3xl font-bold text-emerald-600">382</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">❌ غياب اليوم</p>
          <p className="mt-2 text-3xl font-bold text-rose-600">31</p>
        </div>
      </div>

      {/* جدول الحصص اليومية */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">📅 جدول اليوم</h2>
        <div className="space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
            <div>
              <span className="text-sm font-bold text-indigo-600">08:00 صباحاً</span>
              <h3 className="text-base font-bold text-gray-800 mt-1">ثالثة إعدادي (جوجل 1)</h3>
            </div>
            <button className="mt-3 sm:mt-0 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition shadow-sm">
              تسجيل الحضور
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
            <div>
              <span className="text-sm font-bold text-indigo-600">09:00 صباحاً</span>
              <h3 className="text-base font-bold text-gray-800 mt-1">أولى إعدادي (جوجل 2)</h3>
            </div>
            <button className="mt-3 sm:mt-0 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition shadow-sm">
              تسجيل الحضور
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}