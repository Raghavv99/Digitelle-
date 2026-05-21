import fs from 'fs';

let content = fs.readFileSync('src/views/Dashboard.tsx', 'utf8');

content = content.replace(
  '{ id: "overview", icon: <LayoutDashboard className="w-4 h-4" />, label: "Overview" },',
  `{ id: "overview", icon: <LayoutDashboard className="w-4 h-4" />, label: "Digitelle Dashboard" },\n               { id: "marketplace", icon: <Box className="w-4 h-4" />, label: "Digitelle Marketplace", action: () => reactNavigate('/marketplace') },`
);

content = content.replace(
  'onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}',
  'onClick={item.action ? item.action : () => { setActiveTab(item.id); setIsSidebarOpen(false); }}'
);

fs.writeFileSync('src/views/Dashboard.tsx', content);
