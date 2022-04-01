import React, { MutableRefObject } from 'react';

export type CheckboxProps = {
    value: boolean;
    onChange: (selected: boolean) => void;
    tooltip?: string;
    errorMsg?: string;
    testId?: string;
    className?: string;
    disabled?: boolean;
    inputRef?: MutableRefObject<HTMLDivElement | null>;
};

export const Checkbox: React.FC<CheckboxProps> = ({
    value,
    onChange,
    errorMsg,
    children,
    testId,
    className,
    disabled,
    inputRef,
}) => {

    return (
        <div className="form-checkbox"
            data-test-id={testId}>
            <div className="form-checkbox__line">
                <label>
                    <span className="form-checkbox__content">
                        <div
                            className={'form-checkbox__svg-wrapper' + (value ? " form-checkbox__svg-wrapper--selected" : "")}
                            onClick={() => {
                                if (disabled) return;
                                onChange(!value);
                            }}
                            data-test-id={`${testId}-checkbox`}
                            ref={inputRef}>
                        </div>
                        <div>
                            {children}
                            {errorMsg && (
                                <div
                                    className={`form-checkbox__label-warning`}
                                    data-test-id={`${testId}-error-message`}>
                                    {errorMsg}
                                </div>
                            )}
                        </div>
                    </span>
                </label>
            </div>
        </div>
    );
};
