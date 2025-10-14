import { useState } from "react";
import { useAddTransaction } from "../../hooks/useTransactions.js";
import { validateForm, showToast } from "../../utils/helpers.js";

export default function AddRecord() {
    const [transData, setTransData] = useState({
        amount: "",
        type: "",
        brief: "",
    });

    const [isExpense, setIsExpense] = useState(false);

    const handleToggle = () => {
        setIsExpense(!isExpense);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const type = isExpense ? "expense" : "income";
        setTransData(prev => ({ ...prev, [name]: value, type }));
    };

    const createTransactionMutation = useAddTransaction();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!validateForm.required(transData.brief)) {
            showToast.error("Please enter a description");
            return;
        }

        if (!validateForm.required(transData.amount)) {
            showToast.error("Please enter an amount");
            return;
        }

        if (parseFloat(transData.amount) <= 0) {
            showToast.error("Amount must be greater than 0");
            return;
        }

        createTransactionMutation.mutate(transData, {
            onSuccess: () => {
                setTransData({
                    amount: "",
                    type: "",
                    brief: "",
                });
            }
        });
    };

    return (
        <form className="card border-gray-400 flex card-bordered sm:p-5 p-2" onSubmit={handleSubmit}>
            <div className="flex w-full">
                <label className="flex-1 md:pr-6 sm:pr-3 pr-1 form-control">
                    <div className="label py-0">
                        <span className="label-text">Description...</span>
                    </div>
                    <input
                        type="text"
                        name="brief"
                        autoComplete="off"
                        value={transData.brief}
                        onChange={handleChange}
                        className="input input-accent input-sm input-bordered w-full"
                        placeholder="Enter transaction description"
                        disabled={createTransactionMutation.isPending}
                    />
                    <div className="label"></div>
                </label>

                <label className="form-control">
                    <div className="label py-0">
                        <span className="label-text">Amount...</span>
                    </div>
                    <input
                        type="number"
                        name="amount"
                        autoComplete="off"
                        value={transData.amount}
                        onChange={handleChange}
                        className="input input-accent input-sm input-bordered sm:w-full w-24"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        disabled={createTransactionMutation.isPending}
                    />
                    <div className="label"></div>
                </label>
            </div>

            <div className="flex items-center justify-center w-full">
                <div className="flex-1">
                    <div className="flex h-fit">
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={isExpense}
                            onChange={handleToggle}
                            disabled={createTransactionMutation.isPending}
                        />
                        <div className="ml-3 p-0">
                            <span className={isExpense ? "text-red-600 font-semibold" : "text-green-600 font-semibold"}>
                                {isExpense ? "Expense" : "Income"}
                            </span>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={createTransactionMutation.isPending}
                    className={
                        createTransactionMutation.isPending
                            ? "btn btn-outline btn-primary btn-sm btn-disabled"
                            : "btn btn-outline btn-primary btn-sm"
                    }
                >
                    {createTransactionMutation.isPending && (
                        <span className="loading loading-xs loading-spinner text-error"></span>
                    )}
                    Add Transaction
                </button>
            </div>
        </form>
    );
}
