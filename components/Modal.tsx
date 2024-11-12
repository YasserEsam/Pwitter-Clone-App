import React, { useCallback } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import Button from './Button';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: () => void;
	title: string;
	body?: React.ReactElement;
	footer?: React.ReactElement;
	actionLabel: string;
	disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	title,
	body,
	footer,
	actionLabel,
	disabled,
}) => {
	const handleClose = useCallback(() => {
		if (disabled) {
			return;
		}
		onClose();
	}, [disabled, onClose]);

	const handleSubmit = useCallback(() => {
		if (disabled) {
			return;
		}
		onSubmit();
	}, [disabled, onSubmit]);

	if (!isOpen) {
		return null;
	}

	return (
		<div
			className="
					fixed inset-0 z-50 
					flex items-center justify-center
					bg-neutral-800 bg-opacity-70
  					  ">
			<div
				className="
							relative
							w-full max-w-md
							mx-auto
							rounded-lg
							bg-black
							shadow-lg
						">
				<div className="flex items-center justify-between p-6 border-b border-gray-700">
					<h3 className="text-2xl font-semibold text-white">
						{title}
					</h3>
					<button
						className="text-gray-400 hover:text-white transition"
						onClick={handleClose}>
						<AiOutlineClose size={24} />
					</button>
				</div>

				<div className="p-6">{body}</div>

				<div className="p-6 border-t border-gray-700">
					<Button
						disabled={disabled}
						label={actionLabel}
						onClick={handleSubmit}
						fullWidth
						secondary
						large
					/>

					{footer && (
						<div className="mt-4 text-center text-gray-400">
							{footer}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Modal;
