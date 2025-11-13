import { PrismaClient } from '@prisma/client';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { signOut } from '@/lib/actions/auth-actions';

const prisma = new PrismaClient();

const UserDashboard = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        throw new Error('Not authenticated');
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
            guest: {
                include: {
                    address: true,
                    orders: {
                        include: {
                            order_item: true,
                            invoice: true,
                            shipping: true,
                        },
                        orderBy: {
                            order_date: 'desc'
                        }
                    },
                },
            },
        },
    });

    if (!user) {
        throw new Error('User not found');
    }

    const accInfo = {
        userName: user.name,
        name: user.name,
        address: user.guest?.address?.street_line1 ?? '',
        city: user.guest?.address
            ? [user.guest.address.city, user.guest.address.state, user.guest.address.postal_code]
                .filter(Boolean)
                .join(', ')
            : '',
        country: user.guest?.address?.country ?? '',
    };

    const orders = user.guest?.orders.map((order) => ({
        reference: order.reference,
        date: new Date(order.order_date).toLocaleDateString(),
        paymentStatus: order.invoice?.payment_status ?? 'Pending',
        shipmentStatus: order.shipping?.shipping_status ?? 'Not Shipped',
        total: `$${(order.total_price ?? 0).toFixed(2)}`,
    })) ?? [];

    return (
        <div className="min-h-screen bg-[#e5ede1] py-8 px-4" style={{ fontFamily: 'Lalezar, cursive' }}>
            {/* header */}
            <div className="max-w-6xl mx-auto mb-8 text-center">
                <div className="inline-block">
                    <h1 className="text-4xl font-normal text-black mb-4">
                        Hello, {accInfo.userName}
                    </h1>
                    <hr className="border-t-2 border-[#5B6D50] mb-6" />
                </div>
                <div className="flex flex-row justify-center items-center gap-8">
                    <a 
                        href='/user_dashboard/settings'
                        className="text-[#5B6D50] hover:text-[#4a5a40] hover:underline transition-colors text-lg inline-flex items-center justify-center gap-2"
                    >
                        <span>Settings</span>
                        <svg 
                            className="w-4 h-4 -translate-y-0.5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
                            />
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                            />
                        </svg>
                    </a>
                    <form action={async () => {
                        'use server';
                        await signOut();
                    }}>
                        <button 
                            type="submit"
                            className="text-[#5B6D50] hover:text-[#4a5a40] hover:underline transition-colors text-lg"
                        >
                            Sign Out
                        </button>
                    </form>
                </div>
            </div>

            <div className="max-w-6xl mx-auto space-y-6">
                {/* orders section */}
                <div className="bg-white rounded-lg shadow-md p-8 border-2 border-[#5B6D50]">
                    <h2 className="text-3xl font-normal text-black mb-6 pb-3 border-b-2 border-[#5B6D50]">
                        Orders
                    </h2>
                    
                    {orders.length === 0 ? (
                        <p className="text-gray-600 text-center py-8">No orders found.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-[#5B6D50]">
                                        <th className="text-left py-3 px-4 text-[#5B6D50] font-normal">Order ID</th>
                                        <th className="text-left py-3 px-4 text-[#5B6D50] font-normal">Date</th>
                                        <th className="text-left py-3 px-4 text-[#5B6D50] font-normal">Payment Status</th>
                                        <th className="text-left py-3 px-4 text-[#5B6D50] font-normal">Fulfillment Status</th>
                                        <th className="text-left py-3 px-4 text-[#5B6D50] font-normal">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.reference} className="border-b border-gray-200 hover:bg-[#e5ede1] transition-colors">
                                            <td className="py-4 px-4">
                                                <a 
                                                    href={`/user_dashboard/order/${order.reference}`}
                                                    className="text-[#5B6D50] hover:text-[#4a5a40] hover:underline transition-colors"
                                                >
                                                    #{order.reference}
                                                </a>
                                            </td>
                                            <td className="py-4 px-4 text-gray-700">{order.date}</td>
                                            <td className="py-4 px-4">
                                                <span className={`px-3 py-1 rounded text-sm ${
                                                    order.paymentStatus === 'Paid' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {order.paymentStatus}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className={`px-3 py-1 rounded text-sm ${
                                                    order.shipmentStatus === 'Shipped' 
                                                        ? 'bg-blue-100 text-blue-800' 
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {order.shipmentStatus}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 font-normal text-gray-900">{order.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* account details section */}
                <div className="bg-white rounded-lg shadow-md p-8 border-2 border-[#5B6D50]">
                    <h2 className="text-3xl font-normal text-black mb-6 pb-3 border-b-2 border-[#5B6D50]">
                        Account Details
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 p-4 bg-[#e5ede1] rounded">
                            <dt className="font-normal text-[#5B6D50] text-lg md:w-1/4">Username</dt>
                            <dd className="text-gray-700 md:w-3/4">{accInfo.userName}</dd>
                        </div>
                        
                        <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 p-4 bg-[#e5ede1] rounded">
                            <dt className="font-normal text-[#5B6D50] text-lg md:w-1/4">Name</dt>
                            <dd className="text-gray-700 md:w-3/4">{accInfo.name}</dd>
                        </div>
                        
                        <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 p-4 bg-[#e5ede1] rounded">
                            <dt className="font-normal text-[#5B6D50] text-lg md:w-1/4">Address</dt>
                            <dd className="text-gray-700 md:w-3/4">
                                {accInfo.address || accInfo.city || accInfo.country ? (
                                    <>
                                        {accInfo.address && <div>{accInfo.address}</div>}
                                        {accInfo.city && <div>{accInfo.city}</div>}
                                        {accInfo.country && <div>{accInfo.country}</div>}
                                    </>
                                ) : (
                                    <span className="text-gray-400 italic">No address on file</span>
                                )}
                            </dd>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;