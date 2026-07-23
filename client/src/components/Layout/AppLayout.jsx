import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-[1700px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;