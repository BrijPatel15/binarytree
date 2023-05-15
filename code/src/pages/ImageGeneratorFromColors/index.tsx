import style from "./ImageGeneratorFromColors.module.scss";
import {Button, Input, InputNumber, Space } from "antd";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import { saveAs } from "file-saver";
import { useCombinedKeyPress } from "utils/utils";

const { TextArea } = Input;

const ImageGeneratorFromColors: React.FC = () => {
	const [colors, setColors] = useState<Array<string>>([]);
	const [value, setValue] = useState("");
	const domEl = useRef<Array<HTMLDivElement>>([]);
	const [height, setHeight] = useState(40);
	const [width, setWidth] = useState(40);
	const [rounded, setRounded] = useState(20);
	domEl.current = [];

	useCombinedKeyPress(
		() => onTextAreaChange("#FF0000, #00FFFF, #FFFFFF, #C0C0C0, #000000"),
		["ControlLeft", "KeyE"]
	);

	useCombinedKeyPress(() => {
		onTextAreaChange("");
	}, ["ControlLeft", "KeyC"]);

	const onTextAreaChange = (value: string) => {
		setColors(value.split(/[\n,]+/));
		setValue(value);
	};

	const onButtonClick = async () => {
		if (!domEl.current || colors.length === 0) return;

		const zip = new JSZip();

		await Promise.all(
			domEl.current.map(async (el, idx) => {
				const dataUrl = await toPng(el);
				const baseData = await JSZipUtils.getBinaryContent(dataUrl);
				zip.file(`image-${idx + 1}.png`, baseData, { binary: true });
			})
		);

		const content = await zip.generateAsync({ type: "blob" });
		saveAs(content, "ImageGeneratorFromColors.zip");
	};

	return (
		<div className={style.igfc}>
			<TextArea
				placeholder="Paste colors separated by commas or new line"
				rows={20}
				onChange={(event) =>
					onTextAreaChange(event.currentTarget.value)
				}
				value={value}
			/>
			<div>
				<InputNumber
					placeholder="NumberInput with custom layout"
					value={height}
					onChange={(val: any) => setHeight(val)}
					min={0}
				/>
				<InputNumber
					placeholder="NumberInput with custom layout"
					value={width}
					onChange={(val: any) => setWidth(val)}
					min={0}
				/>
				<InputNumber
					placeholder="NumberInput with custom layout"
					value={rounded}
					onChange={(val: any) => setRounded(val)}
					min={0}
				/>
				<Space/>
				<Space>
					<Button onClick={onButtonClick}>Downlaod</Button>
					<Button
						onClick={() => {
							setValue("");
							setColors([]);
						}}
					>
						Clear
					</Button>
				</Space>
			</div>

			<div className={style.colors}>
				{colors.map((color: string, index: number) => {
					return (
						<div className={style.colors__color}>
							<div
								ref={(ref) => {
									if (ref) {
										domEl.current.push(ref);
									}
								}}
								key={`${index}-${color}`}
								style={{
									backgroundColor: color,
									height: `${height}px`,
									width: `${width}px`,
									borderRadius: `${rounded}px`,
								}}
							></div>
							<h5>{color}</h5>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ImageGeneratorFromColors;
