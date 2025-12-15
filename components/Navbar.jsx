'use client'
import { Search, ShoppingCart, Package } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useUser, useClerk, UserButton } from "@clerk/nextjs";

const Navbar = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const { openSignIn } = useClerk();
    const router = useRouter();

    const [search, setSearch] = useState('');
    const cartCount = useSelector(state => state.cart.total);

    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/shop?search=${search}`);
    }

    // Show loading state while Clerk is loading
    if (!isLoaded) {
        return (
            <nav className="relative bg-white">
                <div className="mx-6">
                    <div className="flex items-center justify-between max-w-7xl mx-auto py-4">
                        <Link href="/" className="relative text-4xl font-semibold text-slate-700">
                            <span className="text-green-600">go</span>cart<span className="text-green-600 text-5xl leading-0">.</span>
                            <p className="absolute text-xs font-semibold -top-1 -right-8 px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-green-500">
                                plus
                            </p>
                        </Link>
                        <div className="animate-pulse">
                            <div className="h-9 w-20 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                </div>
                <hr className="border-gray-300" />
            </nav>
        );
    }

    return (
        <nav className="relative bg-white">
            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-4 transition-all">
                    <Link href="/" className="relative text-4xl font-semibold text-slate-700">
                        <span className="text-green-600">go</span>cart<span className="text-green-600 text-5xl leading-0">.</span>
                        <p className="absolute text-xs font-semibold -top-1 -right-8 px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-green-500">
                            plus
                        </p>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">
                        <Link href="/">Home</Link>
                        <Link href="/shop">Shop</Link>
                        <Link href="/">About</Link>
                        <Link href="/">Contact</Link>

                        <form onSubmit={handleSearch} className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full">
                            <Search size={18} className="text-slate-600" />
                            <input 
                                className="w-full bg-transparent outline-none placeholder-slate-600" 
                                type="text" 
                                placeholder="Search products" 
                                value={search} 
                                onChange={(e) => setSearch(e.target.value)} 
                                required 
                            />
                        </form>

                        <Link href="/cart" className="relative flex items-center gap-2 text-slate-600">
                            <ShoppingCart size={18} />
                            Cart
                            <span className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        </Link>

                        {/* User authentication for desktop */}
                        <div className="flex items-center gap-4">
                            {!isSignedIn ? (
                                <button 
                                    onClick={() => openSignIn()} 
                                    className="px-7 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-sm transition text-white rounded-full"
                                >
                                    Login
                                </button>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <UserButton 
                                        afterSignOutUrl="/"
                                        appearance={{
                                            elements: {
                                                userButtonAvatarBox: "w-9 h-9"
                                            }
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div className="sm:hidden flex items-center gap-4">
                        <Link href="/cart" className="relative text-slate-600">
                            <ShoppingCart size={22} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 text-[10px] text-white bg-slate-600 size-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        
                        {!isSignedIn ? (
                            <button 
                                onClick={() => openSignIn()} 
                                className="px-4 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-sm transition text-white rounded-full"
                            >
                                Login
                            </button>
                        ) : (
                            <UserButton 
                                afterSignOutUrl="/"
                                appearance={{
                                    elements: {
                                        userButtonAvatarBox: "w-8 h-8"
                                    }
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
            <hr className="border-gray-300" />
        </nav>
    );
}

export default Navbar;