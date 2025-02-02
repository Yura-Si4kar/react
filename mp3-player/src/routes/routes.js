import AlbumPage from "../pages/AlbumPage";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import Library from "../pages/Library";
import Search from "../pages/Search";
import Settings from "../pages/Settings";
import UserInfoPage from "../pages/UserInfoPage";
import {
  ALBUMS_ROUTE,
  ALBUM_DETAILS_ROUTE,
  LIBRARY_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SEARCH_ROUTE,
  SETTINGS_ROUTE,
  USERS_SETTINGS,
} from "../utils/consts";

export const publicPages = [
  {
    path: LOGIN_ROUTE,
    components: <Auth />,
    caseSensitive: true,
  },
  {
    path: REGISTRATION_ROUTE,
    components: <Auth />,
    caseSensitive: true,
  },
];

export const privatePages = [
  {
    path: USERS_SETTINGS,
    components: <UserInfoPage />,
    caseSensitive: true,
  },
  {
    path: ALBUMS_ROUTE,
    components: <Home />,
    caseSensitive: true,
  },
  {
    path: ALBUM_DETAILS_ROUTE,
    components: <AlbumPage />,
    caseSensitive: true,
  },
  {
    path: SEARCH_ROUTE,
    components: <Search />,
    caseSensitive: true,
  },
  {
    path: LIBRARY_ROUTE,
    components: <Library />,
    caseSensitive: true,
  },
  {
    path: SETTINGS_ROUTE,
    components: <Settings />,
    caseSensitive: true,
  },
];
