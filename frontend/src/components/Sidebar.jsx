import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import apiClient from '../services/apiClient';
import { logout, login as loginRoute, baseUrl, writeArticle, yourArticleList } from '../network/endPoints';
import { setAuthStatus } from '../slices/authSlice';

import writeIcon from '../assets/writearticle.svg';
import powerIcon from '../assets/poweroff.svg';
import settingIcon from '../assets/setting.svg';
import articleIcon from '../assets/article.svg';
import markedIcon from '../assets/markedarticle.svg';

const navItems = [
  { to: '/write-article', icon: writeIcon, label: 'Write an Article', link: writeArticle },
  { to: '/blogs', icon: articleIcon, label: 'Your Articles', link: yourArticleList },
  { to: '/categories', icon: markedIcon, label: 'Marked Articles', link: null },
  { to: '/reviews', icon: settingIcon, label: 'Settings', link: null },
];

const Sidebar = () => {
  const isSideBarOpen = useSelector(state => state.system.isSideBarOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await apiClient({
        method: 'GET',
        url: logout,
        baseURL: baseUrl,
        withCredentials: true,
      });

      if (response.success) {
        dispatch(setAuthStatus({
          isUser: false,
          login: true,
          signup: false,
          isProfileComplete: false,
        }));
      }
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <aside
      className={`fixed top-[5rem] right-0 z-50 h-screen w-[15rem] bg-gradient-to-b from-gray-900 to-black text-white p-5 pt-15 shadow-lg transform transition-transform duration-300 ease-in-out ${
        isSideBarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <nav className="space-y-6">
        {navItems.map(({ to, icon, label, link }) => (
          <NavLink
            key={to}
            to={link}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition text-sm"
          >
            <img src={icon} alt={label} className="w-5 filter invert" />
            <span>{label}</span>
          </NavLink>
        ))}

        <div
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition text-sm cursor-pointer"
        >
          <img src={powerIcon} alt="Logout" className="w-5 filter invert" />
          <span>Logout</span>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
