import React, { useState } from "react";
import "../Constants/Popup.css";

function PopUp({ setOpenPop }) {
	const [user, setUser] = useState({
		userName: "",
		email: "",
		mobile: "",
		gender: "",
		qualification: "",
		languages: [],
	});

	const [errors, setErrors] = useState({});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUser((prevState) => ({
			...prevState,
			[name]: value,
		}));
		validateField(name, value);
	};

	const handleCheckboxChange = (e) => {
		const { value, checked } = e.target;

		setUser((prevState) => {
			const { languages } = prevState;

			if (checked) {
				return { ...prevState, languages: [...languages, value] };
			} else {
				return {
					...prevState,
					languages: languages.filter((lang) => lang !== value),
				};
			}
		});
	};

	const validateForm = () => {
		let isValid = true;
		const newErrors = {};

		if (!user.userName) {
			newErrors.userName = "Name is required";
			isValid = false;
		}

		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!user.email) {
			newErrors.email = "Email is required";
			isValid = false;
		} else if (!emailPattern.test(user.email)) {
			newErrors.email = "Enter a valid email";
			isValid = false;
		}

		if (!user.mobile) {
			newErrors.mobile = "Mobile number is required";
			isValid = false;
		} else if (user.mobile.length !== 10 || isNaN(user.mobile)) {
			newErrors.mobile = "Enter a valid 10-digit mobile number";
			isValid = false;
		}

		if (!user.gender) {
			newErrors.gender = "Please select your gender";
			isValid = false;
		}

		if (!user.qualification) {
			newErrors.qualification = "Please select your qualification";
			isValid = false;
		}

		if (user.languages.length === 0) {
			newErrors.languages = "Please select at least one Skill";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = () => {
		if (validateForm()) {
			setOpenPop(false);
		}
	};

	const validateField = (name, value) => {
		let errorMsg = "";

		switch (name) {
			case "userName":
				if (!value) errorMsg = "Name is required";
				break;
			case "email":
				const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!value) errorMsg = "Email is required";
				else if (!emailPattern.test(value)) errorMsg = "Enter a valid email";
				break;
			case "mobile":
				if (!value) errorMsg = "Mobile number is required";
				else if (value.length !== 10 || isNaN(value))
					errorMsg = "Enter a valid 10-digit mobile number";
				break;
			case "gender":
				if (!value) errorMsg = "Please select your gender";
				break;
			case "qualification":
				if (!value) errorMsg = "Please select your qualification";
				break;
			case "languages":
				if (user.languages.length === 0)
					errorMsg = "Please select at least one Skill";
				break;
			default:
				break;
		}

		setErrors((prevErrors) => ({
			...prevErrors,
			[name]: errorMsg,
		}));
	};

	return (
		<div className="popup-content">
			<div>
				<h2 className="heading">Fill in Your Details</h2>
				<div>
					<div className="inner-div">
						<p>Name: </p>
						<input
							type="text"
							name="userName"
							placeholder="User Name"
							value={user.userName}
							onChange={handleInputChange}
						/>
					</div>
					{errors.userName && <p className="error">{errors.userName}</p>}
					<div className="inner-div">
						<p>Email: </p>
						<input
							type="email"
							name="email"
							placeholder="Email"
							value={user.email}
							onChange={handleInputChange}
						/>
					</div>
					{errors.email && <p className="error">{errors.email}</p>}
					<div className="inner-div">
						<p>Mobile: </p>
						<input
							type="text"
							name="mobile"
							placeholder="Mobile Number"
							maxLength={10}
							value={user.mobile}
							onChange={handleInputChange}
						/>
					</div>
					{errors.mobile && <p className="error">{errors.mobile}</p>}
					<div className="inner-div">
						<p>Gender: </p>
						<select
							className="select"
							name="gender"
							value={user.gender}
							onChange={handleInputChange}
						>
							<option value="">Select</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
							<option value="Others">Others</option>
						</select>
					</div>
					{errors.gender && <p className="error">{errors.gender}</p>}
					<div className="inner-div">
						<p>Qualification: </p>
						<select
							className="select"
							name="qualification"
							value={user.qualification}
							onChange={handleInputChange}
						>
							<option value="">Select</option>
							<option value="B-tech">B-tech</option>
							<option value="M-tech">M-tech</option>
							<option value="Others">Others</option>
						</select>
					</div>
					{errors.qualification && (
						<p className="error">{errors.qualification}</p>
					)}
					<p className="lang-heading">Skills: </p>
					<div className="checkboxes">
						<div>
							<div className="check-div">
								<input
									type="checkbox"
									value="Java"
									checked={user.languages.includes("Java")}
									onChange={handleCheckboxChange}
								/>
								<p>Java</p>
							</div>
							<div className="check-div">
								<input
									type="checkbox"
									value="Python"
									checked={user.languages.includes("Python")}
									onChange={handleCheckboxChange}
								/>
								<p>Python</p>
							</div>
						</div>
						<div>
							<div className="check-div">
								<input
									type="checkbox"
									value="JavaScript"
									checked={user.languages.includes("JavaScript")}
									onChange={handleCheckboxChange}
								/>
								<p>JavaScript</p>
							</div>
							<div className="check-div">
								<input
									type="checkbox"
									value="TypeScript"
									checked={user.languages.includes("TypeScript")}
									onChange={handleCheckboxChange}
								/>
								<p>TypeScript</p>
							</div>
						</div>
					</div>
					{errors.languages && <p className="error">{errors.languages}</p>}
				</div>
				<div className="button-div">
					<button className="submit" onClick={handleSubmit}>
						Submit
					</button>
					<button onClick={() => setOpenPop(false)} className="cancel">
						Close
					</button>
				</div>
			</div>
		</div>
	);
}

export default PopUp;
