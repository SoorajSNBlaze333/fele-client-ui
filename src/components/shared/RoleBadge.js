export default function RoleBadge({ role }) {
  if (role.trim().toLowerCase() === "admin") {
    return <span className="w-16 text-center py-0.5 rounded-full border-2 border-green-200 bg-green-100/80 text-xs capitalize">{role.trim()}</span>;
  } else if (role.trim().toLowerCase() === "reader") {
    return <span className="w-16 text-center py-0.5 rounded-full border-2 border-blue-200 bg-blue-100/80 text-xs capitalize">{role.trim()}</span>;
  } else if (role.trim().toLowerCase() === "writer") {
    return <span className="w-16 text-center py-0.5 rounded-full border-2 border-indigo-200 bg-indigo-100/80 text-xs capitalize">{role.trim()}</span>;
  }
  return <span className="w-16 text-center py-0.5 rounded-full border-2 border-slate-200 bg-slate-100/80 text-xs capitalize">No Role</span>;;
}