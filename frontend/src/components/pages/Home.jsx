import AddRecord from "../transactions/AddRecord";
import Record from "../transactions/Record";
import { useTransactions } from "../../hooks/useTransactions.js";

export default function Home() {
    const { data: transactions, isLoading, isError, refetch } = useTransactions();

    const renderTransactions = () => {
        if (isLoading) {
            return (
                <div className="w-full flex items-center justify-center py-8">
                    <span className="loading loading-bars loading-lg"></span>
                </div>
            );
        }

        if (isError) {
            return (
                <div className="flex w-full items-center justify-center py-8">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-red-600 mb-2">
                            Error Loading Transactions
                        </div>
                        <button
                            onClick={() => refetch()}
                            className="btn btn-primary btn-sm"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        if (!transactions || transactions.length === 0) {
            return (
                <div className="flex w-full items-center justify-center py-8">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-600 mb-2">
                            No transactions yet
                        </div>
                        <div className="text-gray-500">
                            Add your first transaction above to get started!
                        </div>
                    </div>
                </div>
            );
        }

        return [...transactions]
            .reverse()
            .map((trans, id) => (
                <Record
                    key={`${trans.date}-${id}`}
                    data={trans}
                    id={transactions.length - id - 1}
                />
            ));
    };

    return (
        <div className="w-screen md:px-10 sm:px-6 px-3 flex flex-col gap-3 mb-5">
            <AddRecord />

            <div className="card border-gray-400 card-bordered p-3">
                <div className="card-header mb-4">
                    <h2 className="card-title text-xl font-bold">Transaction History</h2>
                </div>

                <div className="card-body p-0">
                    {renderTransactions()}
                </div>
            </div>
        </div>
    );
}
