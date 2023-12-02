import { Card, Table } from "antd";
import { FC } from "react";
import MimeSearch from "./SearchBar";
import { MIME_COLUMNS } from "pages/Information/Mimetype/utils/constants";
import { MimeSearchResultProps } from "pages/Information/Mimetype/utils/types";
import { useSearchParams } from "react-router-dom";
import { filteredMimeType } from "pages/Information/Mimetype/utils/helper";

const MimeSearchResult: FC<MimeSearchResultProps> = ({
	data,
	isError,
	isLoading,
}) => {
	const [searchParams] = useSearchParams();

	const searchQuery = searchParams.get("type") ?? "";

	if (isError) {
		return <div>Something went wrong!</div>;
	}

	const list = searchQuery ? filteredMimeType(data, searchQuery) : data;

	return (
		<Card>
			<MimeSearch />
			<Table
				columns={MIME_COLUMNS}
				dataSource={list}
				pagination={false}
				bordered
				scroll={{ x: "calc(50%)" }}
				loading={isLoading}
			/>
		</Card>
	);
};

export default MimeSearchResult;
