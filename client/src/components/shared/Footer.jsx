import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { setLoading, setUser } from '@/redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '@/utils/constant';

import { useTranslation } from "react-i18next";
import "../../i18n.jsx";
import { t } from 'i18next';

export default function Footer() {
  const { user } = useSelector((store) => store.auth);
  const {t}=useTranslation();
  return (
    <footer className="bg-[#00040A] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <Link to="/"><h3 className="text-lg font-semibold mb-4 text-[#535bf2]">{t("AboutJoblinker")}</h3></Link>
            <p className="text-gray-400">
              {t("Side")}
            </p>
          </div>
          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#535bf2]">{t("QuickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to={user && user.role === "recruiter" ? "/admin/jobs" : "/jobs"}
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-[#535bf2] transition"
                >
                  {t("Jobs")}
                </Link>
              </li>
              <li>
                {user && user.role === "recruiter" && (
                  <Link to="/companies"  onClick={() => window.scrollTo(0, 0)} className="hover:text-[#535bf2] transition">
                    {t("Companies")}
                  </Link>
                )}
              </li>
              <li>
                <Link to="/all-companies" onClick={() => window.scrollTo(0, 0)} className="hover:text-[#535bf2] transition">
                {t("AllCompanies")}
                </Link>
              </li>
              <li>
                <Link to="/aboutus" onClick={() => window.scrollTo(0, 0)} className="hover:text-[#535bf2] transition">
                {t("About")}
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="hover:text-[#535bf2] transition">
                {t("Contact")}
                </Link>

              </li>
              <li>
                <Link to="/review" onClick={() => window.scrollTo(0, 0)} className="hover:text-[#535bf2] transition">
                {t("GiveReviews")}
                </Link>
              </li>

            </ul>
          </div>
          {/* Resources Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#535bf2]">{t("Resources")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blogpage"  onClick={() => window.scrollTo(0, 0)} className="hover:text-[#535bf2] transition">
                  {t("Blog")}
                </Link>
              </li>
              <li>
                <Link to="/help"   onClick={() => window.scrollTo(0, 0)} className="hover:text-[#535bf2] transition">
                  {t("Help")}
                </Link>
              </li>
              <li>
                <Link to="/careers"  onClick={() => window.scrollTo(0, 0)} className="hover:text-[#535bf2] transition">
                {t("Careers")}
                </Link>
              </li>
              <li>
                {/* <Link to="/meetteams" onClick={() => window.scrollTo(0, 0)} className="hover:text-[#535bf2] transition">
                  {t("MeetTeams")}
                </Link> */}

              </li>
            </ul>
          </div>
          {/* Connect With Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#535bf2]">{t("Connect")}</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/joblinker_finder/" className="hover:text-[#535bf2] transition" target="_blank" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/joblinker_finder/2" className="hover:text-[#535bf2] transition" target="_blank" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/" target="_blank" className="hover:text-[#535bf2] transition" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/joblinker_finder/" className="hover:text-[#535bf2] transition" target="_blank" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="mt-4 pt-4 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} {t("Linker")} . {t("Rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
