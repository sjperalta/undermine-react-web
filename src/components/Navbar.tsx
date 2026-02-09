import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, Swords, LayoutGrid, Shield, Menu, X, User, LogIn, UserPlus, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Contests", path: "/", icon: Swords },
  { label: "My Lineups", path: "/my-lineups", icon: LayoutGrid },
  { label: "Leaderboard", path: "/leaderboard", icon: Trophy },
  { label: "Admin", path: "/admin", icon: Shield },
];

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isActive = (path: string) => path === "/admin" ? location.pathname.startsWith("/admin") : location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center glow-sm">
              <Swords className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-foreground">
              UNDER<span className="text-primary">MINE</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    <span className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </span>
                    {active && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Auth Section */}
            <AuthSection />
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground p-2">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-strong border-t border-border px-4 pb-4"
        >
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${active ? "text-primary bg-primary/10" : "text-muted-foreground"
                  }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}

          {/* Mobile Auth Section */}
          <div className="mt-4 pt-4 border-t border-border">
            <MobileAuthSection onClose={() => setMobileOpen(false)} />
          </div>
        </motion.div>
      )}
    </nav>
  );
}

function AuthSection() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Link to="/login">
          <Button variant="ghost" size="sm" className="gap-2">
            <LogIn className="w-4 h-4" />
            Sign In
          </Button>
        </Link>
        <Link to="/register">
          <Button size="sm" className="gap-2 glow-sm">
            <UserPlus className="w-4 h-4" />
            Sign Up
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <User className="w-4 h-4" />
          {user?.username}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="font-semibold">{user?.username}</span>
            <span className="text-xs text-muted-foreground font-normal">{user?.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/my-lineups" className="cursor-pointer">
            <LayoutGrid className="w-4 h-4 mr-2" />
            My Lineups
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MobileAuthSection({ onClose }: { onClose: () => void }) {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col gap-2">
        <Link to="/login" onClick={onClose}>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <LogIn className="w-4 h-4" />
            Sign In
          </Button>
        </Link>
        <Link to="/register" onClick={onClose}>
          <Button className="w-full justify-start gap-2 glow-sm">
            <UserPlus className="w-4 h-4" />
            Sign Up
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="px-3 py-2">
        <p className="font-semibold text-foreground">{user?.username}</p>
        <p className="text-xs text-muted-foreground">{user?.email}</p>
      </div>
      <Button
        variant="ghost"
        onClick={() => {
          logout();
          onClose();
        }}
        className="w-full justify-start gap-2 text-destructive"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </Button>
    </div>
  );
}
