import React, { useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { useHistory, useParams } from "react-router";
import { IUser } from "../../../models/IUser";
import { Users } from "../../../mobx/users";
import { useFormik } from "formik";
import { userValidator } from "../../../providers/validator/user-validator";
import { inject, observer } from "mobx-react";
import { Store } from "../../../mobx/store";
import api from "../../../providers/api";
import { notification } from "antd";
import { useLocationField, useLocationQuery } from "react-location-query";
import ProductForm from "../ProductForm/ProductForm";
import { ProductsStore } from "../../../mobx/products-store";

interface Props {
	productsStore?: ProductsStore;
}

const ProductsEdit = ({ productsStore }: Props) => {
	const [edit, setEdit] = useLocationField("edit", {
		type: "string",
		initial: "",
		hideIfInitial: true,
	});

	const handleSubmit = async () => {
		const { name, category, price }: any = values;

		await productsStore?.changeProduct(
			edit as string,
			name,
			category,
			price
		);

		// @ts-ignore
		setEdit("");
	};

	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
	const [values, setValues] = useState({});

	if (edit === "") return null;

	const product = productsStore!.getProductById(edit as string);
	if (!product) return null;

	return (
		<Modal
			title="Редагування користувача"
			visible={true}
			onOk={() => handleSubmit()}
			// @ts-ignore
			onCancel={() => setEdit("")}
			okText="Змінити"
			cancelText="Скасувати"
			okButtonProps={{ disabled: submitButtonDisabled }}
			keyboard={false}
			closable={false}
			maskClosable={false}
		>
			<ProductForm
				loading={false}
				onSubmit={() => {}}
				onValidChange={(valid, values: any) => {
					setValues(values);
					const newSubmitButtonDisabled =
						!valid ||
						!(
							+values.price === product?.price &&
							values.name === product?.name &&
							values.category === product?.category
						);
					setSubmitButtonDisabled(!newSubmitButtonDisabled);
				}}
				withSubmitButton={false}
				initialCategory={product?.category}
				initialName={product?.name}
				initialPrice={product?.price.toString()}
			/>
		</Modal>
	);
};

export default inject("productsStore")(observer(ProductsEdit));
