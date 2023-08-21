import { fireEvent, render, screen } from "@testing-library/react";
import { describe, test } from "vitest";
import JsonToTypescript from "..";

describe("JsonToTs", () => {
	test("render component without crash", () => {
		render(<JsonToTypescript />);
	});

	test("render json textfield", () => {
		render(<JsonToTypescript />);

		const JsonTextbox = screen.getByPlaceholderText("JSON");
		expect(JsonTextbox).toBeInTheDocument();

		const rootInterfacenameInput = screen.getByPlaceholderText(
			"Enter Interface name"
		);
		expect(rootInterfacenameInput).toBeInTheDocument();
	});

	test("generates interfaces on button click", () => {
		render(<JsonToTypescript />);

		const jsonTextarea = screen.getByPlaceholderText("JSON");
		fireEvent.change(jsonTextarea, {
			target: { value: '{"key": "value"}' },
		});

		const interfaceInput =
			screen.getByPlaceholderText(/Enter Interface name/i);
		const ROOT_INTERFACE_NAME = "MyInterface";

		fireEvent.change(interfaceInput, {
			target: { value: ROOT_INTERFACE_NAME },
		});

		const convertButton = screen.getByText("Convert");
		fireEvent.click(convertButton);

		const generatedInterfaces = screen.getByText(ROOT_INTERFACE_NAME);
		expect(generatedInterfaces).toBeInTheDocument();

		const getValueOfType = screen.getByText(/string/i);

		expect(getValueOfType).toBeInTheDocument();
	});
});