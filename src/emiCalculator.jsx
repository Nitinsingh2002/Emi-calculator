import { useState } from "react";
function Emi() {
    const [ammount, setAmmount] = useState(null)
    const [year, setYear] = useState(null)
    const [rate, setRate] = useState(null)
    const [total, setTotal] = useState(null);
    const [message, setMessage] = useState("");
    const[outputMonths,setOutputMonths] = useState(0);


    function handleAmmount(e) {
        setAmmount(e.target.value);
    }
    function handleyear(e) {
        setYear(e.target.value)
    }
    function handleRate(e) {
        setRate(e.target.value)
    }


    function handleCalculate(e) {
        if (ammount > 500000 || ammount < 10000) {
            setMessage("Please enter a correct ammount between ₹10,000 and ₹500,000");
            setTotal(null);
            return;
        } else if (year > 5 || year < 1) {
            setMessage("Please enter a correct year between 1 and 5");
            setTotal(null);
            return;
        } else if (rate > 21 || rate < 10) {
            setMessage("Please enter a correct interest rate between 10% and 21%");
            setTotal(null);
            return;
        }

        // Calculation
        const p = ammount;
        const r = (rate / 100) / 12;
        const n = year * 12;
        const numerator = p * r * Math.pow(1 + r, n);
        const denominator = Math.pow(1 + r, n) - 1;
        const result = numerator / denominator;
        setTotal(result);
        setMessage("");
        setOutputMonths(year*12);

    }

    console.log("Ammount", ammount)
    console.log("year", year)
    console.log("rate", rate)
    console.log("total", total)
    return (
        <>

            <div className="container-fluid bg-dark  p-4">
                <h3 className="text-center text-white">EMI CALCULATOR</h3>

                <div className="bg-light text-dark p-4 mt-4 mb-4 rounded">
                    <div className="row mt-4 d-flex ">
                        <div className="col  text-center "> Amount you need &#8377; <input type="number" value={ammount} onChange={handleAmmount}className="rounded" placeholder="0" /></div>
                        <div className="col  text-center">for <input type="number" value={year} onChange={handleyear}  className="rounded" placeholder="0"/> year</div>
                        <div className="col  text-center">intrest rate <input type="number" value={rate} onChange={handleRate} className="rounded px-1" placeholder="0"/> %</div>
                    </div>

                    <div className="row mt-5">
                        <div className="col text-center " >
                            &#8377;10000  <input type="range" min="10000" max="500000" onChange={handleAmmount} value={ammount} style={{width:"40%"}}/> &#8377;500000
                        </div>
                        <div className="col text-center">
                            1 <input type="range" min="1" max="5" onChange={handleyear} value={year} style={{width:"40%"}} /> 5
                        </div>
                        <div className="col text-center">
                            10.45%  <input type="range" min="10.45" max="21" onChange={handleRate} value={rate} step="0.01" style={{width:"40%"}} /> 21%
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col text-end">
                            <button onClick={handleCalculate} className="btn btn-primary" >
                                calculate
                            </button>
                        </div>
                    </div>

                    <div className="row mt-5">
                        {total !== null ? (
                            <p className="text-center fs-4">
                                Your Monthly installment is <span className="text-success font-weight-bold">{Math.round(total).toLocaleString('en-in', { style: "currency", currency: "INR" })}</span> for <span>{outputMonths}</span> Months
                            </p>
                        ) : (
                            <p className="text-center text-danger">{message}</p>
                        )}
                    </div>

                </div>
            </div>

        </>
    )
}

export default Emi;