import React from "react";
import styled from "styled-components";
import { BoxGroupSection, Label, LinkIcon } from "../../base";

const getContrastColor = props => {
    const red = parseInt(props.color.substr(1, 2), 16);
    const green = parseInt(props.color.substr(3, 2), 16);
    const blue = parseInt(props.color.substr(5, 2), 16);
    const yiq = (red * 299 + green * 587 + blue * 114) / 1000;
    return yiq >= 128 ? "black" : "white";
};

const LabelItemContainer = styled.div`
    position: relative;
`;

const LabelItemBox = styled(BoxGroupSection)`
    align-items: center;
    display: flex;
`;

const LabelItemExampleContainer = styled.div`
    min-width: 30%;
`;

const LabelItemExample = styled(Label)`
    font-size: ${props => props.theme.fontSize.lg};
    background-color: ${props => props.color};
    color: ${getContrastColor};
`;

const LabelItemIcons = styled.div`
    align-items: center;
    background-color: transparent;
    display: flex;
    font-size: 17px;
    padding-right: 15px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 20;

    *:not(:first-child) {
        margin-left: 5px;
    }
`;

export const Item = ({ name, color, description, id }) => (
    <LabelItemContainer>
        <LabelItemBox>
            <LabelItemExampleContainer>
                <LabelItemExample color={color}>{name}</LabelItemExample>
            </LabelItemExampleContainer>
            {description}
        </LabelItemBox>
        <LabelItemIcons>
            <LinkIcon to={{ state: { editLabel: id } }} color="orange" name="pencil-alt" tip="Edit" />
            <LinkIcon to={{ state: { removeLabel: id } }} color="red" name="fas fa-trash" tip="Remove" />
        </LabelItemIcons>
    </LabelItemContainer>
);