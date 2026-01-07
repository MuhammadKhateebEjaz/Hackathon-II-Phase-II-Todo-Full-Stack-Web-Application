// // export default function Home() {
// //   return (
// //     <main className="p-4">
// //       <h1 className="text-2xl font-bold">Phase II Todo Full Stack Web Application</h1>
// //       <p>Welcome! Start by logging in or creating tasks.</p>
// //     </main>
// //   )
// // }




// "use client";

// import { useState, FormEvent } from "react";

// export default function Home() {
//   const [isSignup, setIsSignup] = useState(false);
//   const [user, setUser] = useState<{ name: string; email: string } | null>(null);
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSignup = (e: FormEvent) => {
//     e.preventDefault();
//     const { name, email, password } = formData;
//     localStorage.setItem("user", JSON.stringify({ name, email, password }));
//     alert("Sign Up successful! Please Sign In.");
//     setIsSignup(false);
//     setFormData({ name: "", email: "", password: "" });
//   };

//   const handleSignin = (e: FormEvent) => {
//     e.preventDefault();
//     const savedUser = JSON.parse(localStorage.getItem("user") || "null");
//     if (savedUser && savedUser.email === formData.email && savedUser.password === formData.password) {
//       setUser({ name: savedUser.name, email: savedUser.email });
//       setFormData({ name: "", email: "", password: "" });
//     } else {
//       alert("Invalid email or password!");
//     }
//   };

//   const handleLogout = () => setUser(null);

//   // Navbar component
//   const Navbar = () => (
//     <nav className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white p-4 shadow-md">
//       <h1 className="text-xl font-bold text-center">Phase II Todo Full Stack Web Application</h1>
//     </nav>
//   );

//   // Footer component
//   const Footer = () => (
//     <footer className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white p-4 mt-6 text-center">
//       <p>© 2026 Muhammad Khateeb Ejaz</p>
//     </footer>
//   );

//   if (user) {
//     // Dashboard view
//     return (
//       <>
//         <Navbar />
//         <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-green-200 to-blue-200 p-4">
//           <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
//             <h2 className="text-3xl font-bold mb-4 text-green-600">Welcome, {user.name}!</h2>
//             <p className="mb-6 text-gray-600">You're now logged in. Start managing your tasks.</p>
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold transition"
//             >
//               Logout
//             </button>
//           </div>
//         </main>
//         <Footer />
//       </>
//     );
//   }

//   // Login / Sign Up view
//   return (
//     <>
//       <Navbar />
//       <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-purple-300 to-pink-200 p-4">
//         <div className="text-center mb-6">
//           <h2 className="text-3xl font-bold text-gray-700 mb-2">Muhammad Khateeb Ejaz</h2>
//           <p className="text-lg text-gray-600">Phase II Todo Full Stack Web Application</p>
//         </div>
//         <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden">
//           <div className="p-8 text-center">
//             <h2 className="text-3xl font-bold text-purple-700 mb-6">
//               {isSignup ? "Create Account" : "Welcome Back"}
//             </h2>
//             <form onSubmit={isSignup ? handleSignup : handleSignin} className="flex flex-col space-y-4">
//               {isSignup && (
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
//                 />
//               )}
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
//               />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
//               />
//               <button
//                 type="submit"
//                 className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full font-semibold transition"
//               >
//                 {isSignup ? "Sign Up" : "Sign In"}
//               </button>
//             </form>
//             <p className="mt-4 text-gray-500">
//               {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
//               <span
//                 className="text-purple-600 font-bold cursor-pointer hover:underline"
//                 onClick={() => setIsSignup(!isSignup)}
//               >
//                 {isSignup ? "Sign In" : "Sign Up"}
//               </span>
//             </p>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// }











"use client";

import { useState, useEffect, FormEvent } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [isSignup, setIsSignup] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [currentMenu, setCurrentMenu] = useState<number | null>(null);
  const [updateTaskId, setUpdateTaskId] = useState<number | null>(null);
  const [updateTaskTitle, setUpdateTaskTitle] = useState("");

  // Load tasks from localStorage on dashboard
  useEffect(() => {
    if (user) {
      const savedTasks = JSON.parse(localStorage.getItem(`tasks_${user.email}`) || "[]");
      setTasks(savedTasks);
    }
  }, [user]);

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    const { name, email, password } = formData;
    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    alert("Sign Up successful! Please Sign In.");
    setIsSignup(false);
    setFormData({ name: "", email: "", password: "" });
  };

  const handleSignin = (e: FormEvent) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (savedUser && savedUser.email === formData.email && savedUser.password === formData.password) {
      setUser({ name: savedUser.name, email: savedUser.email });
      setFormData({ name: "", email: "", password: "" });
    } else {
      alert("Invalid email or password!");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setTasks([]);
    setCurrentMenu(null);
  };

  // Task actions
  const addTask = (e: FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const task: Task = { id: Date.now(), title: newTask.trim(), completed: false };
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${user!.email}`, JSON.stringify(updatedTasks));
    setNewTask("");
  };

  const updateTask = (e: FormEvent) => {
    e.preventDefault();
    if (updateTaskId === null) return;
    const updatedTasks = tasks.map((t) =>
      t.id === updateTaskId ? { ...t, title: updateTaskTitle } : t
    );
    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${user!.email}`, JSON.stringify(updatedTasks));
    setUpdateTaskId(null);
    setUpdateTaskTitle("");
    setCurrentMenu(null);
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${user!.email}`, JSON.stringify(updatedTasks));
  };

  const toggleComplete = (id: number) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${user!.email}`, JSON.stringify(updatedTasks));
  };

  // Navbar & Footer
  const Navbar = () => (
    <nav className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white p-5 shadow-xl sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-center">Phase II Todo Full Stack Web Application</h1>
    </nav>
  );

  const Footer = () => (
    <footer className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white p-4 mt-6 text-center">
      <p>© 2026 Muhammad Khateeb Ejaz</p>
    </footer>
  );

  // Dashboard menu UI
  const DashboardMenu = () => (
    <div className="flex flex-col gap-3 mb-6">
      <button
        onClick={() => setCurrentMenu(1)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-medium transition"
      >
        1. Add Task
      </button>
      <button
        onClick={() => setCurrentMenu(2)}
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full font-medium transition"
      >
        2. List Tasks
      </button>
      <button
        onClick={() => setCurrentMenu(3)}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full font-medium transition"
      >
        3. Update Task
      </button>
      <button
        onClick={() => setCurrentMenu(4)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-medium transition"
      >
        4. Delete Task
      </button>
      <button
        onClick={() => setCurrentMenu(5)}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-medium transition"
      >
        5. Mark Task Completed
      </button>
      <button
        onClick={handleLogout}
        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-full font-medium transition"
      >
        6. Exit
      </button>
    </div>
  );

  // Render menu actions
  const renderMenuAction = () => {
    switch (currentMenu) {
      case 1:
        return (
          <form onSubmit={addTask} className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Enter new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-semibold transition"
            >
              Add
            </button>
          </form>
        );
      case 2:
        return (
          <ul className="space-y-2 max-h-60 overflow-y-auto mb-4">
            {tasks.length === 0 && <p className="text-gray-400 text-center">No tasks yet!</p>}
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-xl shadow-sm"
              >
                <span className={task.completed ? "line-through text-gray-400" : ""}>
                  {task.title}
                </span>
                <button
                  onClick={() => toggleComplete(task.id)}
                  className="text-green-500 font-bold hover:text-green-700"
                >
                  ✓
                </button>
              </li>
            ))}
          </ul>
        );
      case 3:
        return (
          <form onSubmit={updateTask} className="flex gap-2 mb-4">
            <select
              className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={updateTaskId ?? ""}
              onChange={(e) => setUpdateTaskId(Number(e.target.value))}
              required
            >
              <option value="">Select Task</option>
              {tasks.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="New title"
              value={updateTaskTitle}
              onChange={(e) => setUpdateTaskTitle(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full font-semibold transition"
            >
              Update
            </button>
          </form>
        );
      case 4:
        return (
          <ul className="space-y-2 mb-4">
            {tasks.length === 0 && <p className="text-gray-400 text-center">No tasks to delete!</p>}
            {tasks.map((t) => (
              <li
                key={t.id}
                className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-xl shadow-sm"
              >
                <span>{t.title}</span>
                <button
                  onClick={() => deleteTask(t.id)}
                  className="text-red-500 font-bold hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        );
      case 5:
        return (
          <ul className="space-y-2 mb-4">
            {tasks.length === 0 && <p className="text-gray-400 text-center">No tasks yet!</p>}
            {tasks.map((t) => (
              <li
                key={t.id}
                className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-xl shadow-sm"
              >
                <span className={t.completed ? "line-through text-gray-400" : ""}>{t.title}</span>
                <button
                  onClick={() => toggleComplete(t.id)}
                  className="text-green-500 font-bold hover:text-green-700"
                >
                  Toggle
                </button>
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  if (user) {
    return (
      <>
        <Navbar />
        <main className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-tr from-green-200 to-blue-200 p-4 animate-gradient">
          <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md transform hover:scale-105 transition duration-500">
            <h2 className="text-3xl font-bold mb-4 text-green-600">Welcome, {user.name}!</h2>

            <DashboardMenu />
            {renderMenuAction()}

            <button
              onClick={handleLogout}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold shadow-md transition"
            >
              Logout
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Login / Sign Up
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-purple-300 to-pink-200 p-4 animate-gradient">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Muhammad Khateeb Ejaz</h2>
          <p className="text-lg text-gray-600">Phase II Todo Full Stack Web Application</p>
        </div>
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform hover:scale-105 transition duration-500">
          <div className="p-10 text-center">
            <h2 className="text-3xl font-bold text-purple-700 mb-6">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h2>
            <form onSubmit={isSignup ? handleSignup : handleSignin} className="flex flex-col space-y-5">
              {isSignup && (
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-full font-semibold shadow-md transition"
              >
                {isSignup ? "Sign Up" : "Sign In"}
              </button>
            </form>
            <p className="mt-5 text-gray-500">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <span
                className="text-purple-600 font-bold cursor-pointer hover:underline"
                onClick={() => setIsSignup(!isSignup)}
              >
                {isSignup ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
