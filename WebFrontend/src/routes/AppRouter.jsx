import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../shared/Layout';
import Home from '../views/Home';
import Login from '../views/auth/Login';
import Register from '../views/auth/Register';
import Profile from '../views/auth/Profile';
import PrivacySettings from '../views/auth/PrivacySettings';
import RecipesList from '../views/recipes/RecipesList';
import RecipeDetail from '../views/recipes/RecipeDetail';
import RecipeEditor from '../views/recipes/RecipeEditor';
import Collections from '../views/recipes/Collections';
import MealPlanner from '../views/meal/MealPlanner';
import ShoppingList from '../views/meal/ShoppingList';
import Community from '../views/social/Community';
import NotFound from '../views/NotFound';
import { AuthProvider } from '../state/AuthContext';
import { LiveAnnouncer } from 'react-aria-live';

// PUBLIC_INTERFACE
export default function AppRouter() {
  /** Root router defines all primary app routes with nested layout for shared UI.
   * It wraps routes with AuthProvider and accessibility live region announcer.
   */
  return (
    <LiveAnnouncer>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="profile" element={<Profile />} />
              <Route path="privacy" element={<PrivacySettings />} />
              <Route path="recipes" element={<RecipesList />} />
              <Route path="recipes/new" element={<RecipeEditor mode="create" />} />
              <Route path="recipes/:id" element={<RecipeDetail />} />
              <Route path="recipes/:id/edit" element={<RecipeEditor mode="edit" />} />
              <Route path="collections" element={<Collections />} />
              <Route path="meal-planner" element={<MealPlanner />} />
              <Route path="shopping-list" element={<ShoppingList />} />
              <Route path="community" element={<Community />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LiveAnnouncer>
  );
}
