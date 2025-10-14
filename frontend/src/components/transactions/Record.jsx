import { useState } from 'react';
import { useDeleteTransaction } from '../../hooks/useTransactions.js';
import { formatCurrency } from '../../utils/helpers.js';

export default function Record({ data, id }) {
    const [loading, setLoading] = useState(false);

    const deleteTransactionMutation = useDeleteTransaction();

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteTransactionMutation.mutateAsync(id);
        } catch (error) {
            console.error("Delete error:", error);
        } finally {
            setLoading(false);
        }
    };

    const isExpense = data.type === "expense";
    const amount = parseFloat(data.amount) || 0;

    return (
        <div className="sm:px-4 md:px-4 lg:px-4 px-2 py-2 flex gap-3 justify-center items-center select-none hover:bg-gray-50 transition-colors">
            <div className="flex flex-1 flex-col">
                <span className="items-center py-0 text-gray-500 text-xs">{data.date}</span>
                <span className="text-lg py-0 font-medium">{data.brief}</span>
            </div>

            <span className="py-1 text-gray-600">₹</span>

            <div className="flex gap-2">
                <span className={`flex justify-center font-black text-black items-center md:w-20 w-16 ${isExpense ? 'bg-red-300' : 'bg-gray-200'
                    }`}>
                    {isExpense ? formatCurrency(amount).replace('$', '') : '0'}
                </span>
                <span className={`flex justify-center font-black text-black items-center md:w-20 w-16 ${!isExpense ? 'bg-green-300' : 'bg-gray-200'
                    }`}>
                    {!isExpense ? formatCurrency(amount).replace('$', '') : '0'}
                </span>
            </div>

            <div className="relative flex flex-col items-center justify-center">
                <div className="dropdown dropdown-bottom dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-sm m-1 p-1 hover:bg-gray-100">
                        <MenuIcon />
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <button
                                onClick={handleDelete}
                                className={loading ? "btn-disabled text-red-600" : "text-red-600 hover:bg-red-50"}
                                disabled={loading}
                            >
                                Delete Transaction
                                {loading && <span className="loading loading-spinner text-red-600 loading-xs"></span>}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function MenuIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
        </svg>
    );
}
