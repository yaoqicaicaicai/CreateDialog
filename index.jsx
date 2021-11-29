import { render } from 'react-dom';

class CreateDialog {
    globalDialogStack = [];

    open(
        component,
        options = {
            maskOpacity: '0.3',
        },
    ) {
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.right = '0';
        container.style.bottom = '0';
        container.style.zIndex = '9999';
        container.style.background = `rgba(51, 51, 51, ${options.maskOpacity})`;
        document.body.appendChild(container);
        render(component, container);

        const dialogPromise = new Promise((resolve) => {
            this.globalDialogStack.push({ resolve });
        }).then(() => {
            if (document.body.contains(container)) {
                document.body.removeChild(container);
            }
        });
        return dialogPromise;
    }

    close() {
        const dialogContainer = this.globalDialogStack.pop();
        dialogContainer.resolve();
    }
}

const dialog = new CreateDialog();
export default dialog;
