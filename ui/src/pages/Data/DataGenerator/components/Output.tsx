import React from "react";
import { Tabs, type TabsProps } from "antd";
import CodeHighlightWithCopy from "components/General/CodeHighlightWithCopy";
import { OutputPropsType } from "../utils/types";

const Output: React.FC<OutputPropsType> = ({ json, sql }) => {
	const items: TabsProps["items"] = [
		{
			key: "1",
			label: "SQL",
			children: <CodeHighlightWithCopy codeString={sql} language="sql" />,
		},
		{
			key: "2",
			label: "JSON",
			children: (
				<CodeHighlightWithCopy codeString={json} language="json" />
			),
		},
	];
	return <Tabs defaultActiveKey="1" items={items} />;
};

export default Output;