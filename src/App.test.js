import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, getByTestId, getByText } from '@testing-library/react';

import Calculator from "./components/Calculator";

describe('계산기 테스트', () => {
  it('(√ 버튼을 추가했는 지)', () => {
    const utils = render(<Calculator/>);
    utils.getByText('√');
  });

  it('(history 추가했는 지)', () => {
    const utils = render(<Calculator/>);
    utils.getByText('√');
  });

  it('40 - 31 == 9', () => {
    const utils = render(<Calculator/>);
    let btn_4 = utils.getByText('4');
    let btn_0 = utils.getByText('0');
    let btn_3 = utils.getByText('3');
    let btn_1 = utils.getByText('1');
    let minus = utils.getByText('-');
    expect(utils.getByTestId('display').textContent).toBe('');
    act(() => {fireEvent.click(btn_4);});
    act(() => {fireEvent.click(btn_0);});
    act(() => {fireEvent.click(minus);});
    act(() => {fireEvent.click(btn_3);});
    act(() => {fireEvent.click(btn_1);});
    expect(utils.getByTestId('display').textContent).toBe('40-31');

    act(() => {fireEvent.click(utils.getByText('='));})
    expect(utils.getByTestId('display').textContent).toBe('9');
  })

  it('3.14 == 3.14', () => {
    const utils = render(<Calculator/>);
    let btn_4 = utils.getByText('4');
    let btn_3 = utils.getByText('3');
    let btn_1 = utils.getByText('1');
    let point = utils.getByText('.');
    expect(utils.getByTestId('display').textContent).toBe('');
    act(() => {fireEvent.click(btn_3);});
    act(() => {fireEvent.click(point);});
    act(() => {fireEvent.click(btn_1);});
    act(() => {fireEvent.click(btn_4);});
    expect(utils.getByTestId('display').textContent).toBe('3.14');

    act(() => {fireEvent.click(utils.getByText('='));})
    expect(utils.getByTestId('display').textContent).toBe('3.14');
  })

  it('3..14 == 3.14', () => {
    const utils = render(<Calculator/>);
    let btn_4 = utils.getByText('4');
    let btn_3 = utils.getByText('3');
    let btn_1 = utils.getByText('1');
    let point = utils.getByText('.');
    expect(utils.getByTestId('display').textContent).toBe('');
    act(() => {fireEvent.click(btn_3);});
    act(() => {fireEvent.click(point);});
    act(() => {fireEvent.click(point);}); // 무시되어야 함
    act(() => {fireEvent.click(btn_1);});
    act(() => {fireEvent.click(btn_4);});
    expect(utils.getByTestId('display').textContent).toBe('3.14');

    act(() => {fireEvent.click(utils.getByText('='));})
    expect(utils.getByTestId('display').textContent).toBe('3.14');
  })

  it('3.1.4 == 3.14', () => {
    const utils = render(<Calculator/>);
    let btn_4 = utils.getByText('4');
    let btn_3 = utils.getByText('3');
    let btn_1 = utils.getByText('1');
    let point = utils.getByText('.');
    expect(utils.getByTestId('display').textContent).toBe('');
    act(() => {fireEvent.click(btn_3);});
    act(() => {fireEvent.click(point);});
    act(() => {fireEvent.click(btn_1);});
    act(() => {fireEvent.click(point);}); // 무시되어야 함
    act(() => {fireEvent.click(btn_4);});
    expect(utils.getByTestId('display').textContent).toBe('3.14');

    act(() => {fireEvent.click(utils.getByText('='));})
    expect(utils.getByTestId('display').textContent).toBe('3.14');
  })

  it('97 × 107 == 10379', () => {
    const utils = render(<Calculator/>);
    expect(utils.getByTestId('display').textContent).toBe('');
    let btn_9 = utils.getByText('9');
    let btn_7 = utils.getByText('7');
    let btn_1 = utils.getByText('1');
    let btn_0 = utils.getByText('0');
    let mult = utils.getByText('×');

    act(() => {fireEvent.click(btn_9);});
    act(() => {fireEvent.click(btn_7);});
    act(() => {fireEvent.click(mult);});
    act(() => {fireEvent.click(btn_1);});
    act(() => {fireEvent.click(btn_0);});
    act(() => {fireEvent.click(btn_7);});
    expect(utils.getByTestId('display').textContent).toBe('97×107');

    act(() => {fireEvent.click(utils.getByText('='));});
    expect(utils.getByTestId('display').textContent).toBe('10379');
  })

  it('2 × 2 × 2 == 8', () => {
    const utils = render(<Calculator/>);
    expect(utils.getByTestId('display').textContent).toBe('');
    let btn_2 = utils.getByText('2');
    let mult = utils.getByText('×');

    act(() => {fireEvent.click(btn_2);});
    act(() => {fireEvent.click(mult);});
    act(() => {fireEvent.click(btn_2);});
    act(() => {fireEvent.click(mult);});
    act(() => {fireEvent.click(btn_2);});
    expect(utils.getByTestId('display').textContent).toBe('2×2×2');

    act(() => {fireEvent.click(utils.getByText('='));});
    expect(utils.getByTestId('display').textContent).toBe('8');
  })

  it('16 ÷ 4 == 4', () => {
    const utils = render(<Calculator/>);
    expect(utils.getByTestId('display').textContent).toBe('');
    let btn_1 = utils.getByText('1');
    let btn_6 = utils.getByText('6');
    let btn_4 = utils.getByText('4');
    let div = utils.getByText('÷');

    act(() => {fireEvent.click(btn_1);});
    act(() => {fireEvent.click(btn_6);});
    act(() => {fireEvent.click(div);});
    act(() => {fireEvent.click(btn_4);});
    expect(utils.getByTestId('display').textContent).toBe('16÷4');

    act(() => {fireEvent.click(utils.getByText('='));});
    expect(utils.getByTestId('display').textContent).toBe('4');
  })

  it('16 ÷ 2 ÷ 4 == 2', () => {
    const utils = render(<Calculator/>);
    expect(utils.getByTestId('display').textContent).toBe('');
    let btn_1 = utils.getByText('1');
    let btn_6 = utils.getByText('6');
    let btn_2 = utils.getByText('2');
    let btn_4 = utils.getByText('4');
    let div = utils.getByText('÷');

    act(() => {fireEvent.click(btn_1);});
    act(() => {fireEvent.click(btn_6);});
    act(() => {fireEvent.click(div);});
    act(() => {fireEvent.click(btn_2);});
    act(() => {fireEvent.click(div);});
    act(() => {fireEvent.click(btn_4);});
    expect(utils.getByTestId('display').textContent).toBe('16÷2÷4');

    act(() => {fireEvent.click(utils.getByText('='));})
    expect(utils.getByTestId('display').textContent).toBe('2');
  })

  it('√16 == 4', () => {
    const utils = render(<Calculator/>);
    expect(utils.getByTestId('display').textContent).toBe('');
    let btn_1 = utils.getByText('1');
    let btn_6 = utils.getByText('6');
    let root = utils.getByText('√');

    act(() => {fireEvent.click(btn_1);});
    act(() => {fireEvent.click(btn_6);});
    expect(utils.getByTestId('display').textContent).toBe('16');

    act(() => {fireEvent.click(root);});
    expect(utils.getByTestId('display').textContent).toBe('4');
  })

  it('√(77 + 4)  == 9', () => {
    const utils = render(<Calculator/>);
    expect(utils.getByTestId('display').textContent).toBe('');
    let btn_7 = utils.getByText('7');
    let btn_4 = utils.getByText('4');
    let root = utils.getByText('√');
    let plus = utils.getByText('+');

    act(() => {fireEvent.click(btn_7);});
    act(() => {fireEvent.click(btn_7);});
    act(() => {fireEvent.click(plus);});
    act(() => {fireEvent.click(btn_4);});
    expect(utils.getByTestId('display').textContent).toBe('77+4');

    act(() => {fireEvent.click(root);});
    expect(utils.getByTestId('display').textContent).toBe('9');
  })

  it('√(77 + 4)  == 9', () => {
    const utils = render(<Calculator/>);
    expect(utils.getByTestId('display').textContent).toBe('');
    let btn_7 = utils.getByText('7');
    let btn_4 = utils.getByText('4');
    let root = utils.getByText('√');
    let plus = utils.getByText('+');

    act(() => {fireEvent.click(btn_7);});
    act(() => {fireEvent.click(btn_7);});
    act(() => {fireEvent.click(plus);});
    act(() => {fireEvent.click(btn_4);});
    expect(utils.getByTestId('display').textContent).toBe('77+4');

    act(() => {fireEvent.click(root);});
    expect(utils.getByTestId('display').textContent).toBe('9');
  })

  it('√(77 + 4)  == 9', () => {
    const utils = render(<Calculator/>);
    expect(utils.getByTestId('display').textContent).toBe('');
    let btn_7 = utils.getByText('7');
    let btn_4 = utils.getByText('4');
    let root = utils.getByText('√');
    let plus = utils.getByText('+');

    act(() => {fireEvent.click(btn_7);});
    act(() => {fireEvent.click(btn_7);});
    act(() => {fireEvent.click(plus);});
    act(() => {fireEvent.click(btn_4);});
    expect(utils.getByTestId('display').textContent).toBe('77+4');

    act(() => {fireEvent.click(root);});
    expect(utils.getByTestId('display').textContent).toBe('9');
  })

  it('√("") 무시', () => {
    const utils = render(<Calculator/>);
    expect(utils.getByTestId('display').textContent).toBe('');
    let root = utils.getByText('√');
    act(() => {fireEvent.click(root);});
    expect(utils.getByTestId('display').textContent).toBe('');
  })

  it('history 생성', () => {
    const utils = render(<Calculator/>);
    expect(utils.getByTestId('display').textContent).toBe('');
    let btn_7 = utils.getByText('7');
    let btn_4 = utils.getByText('4');
    let plus = utils.getByText('+');

    act(() => {fireEvent.click(btn_7);});
    act(() => {fireEvent.click(plus);});
    act(() => {fireEvent.click(btn_4);});
    expect(utils.getByTestId('display').textContent).toBe('7+4');

    act(() => {fireEvent.click(utils.getByText('='));})
    expect(utils.getByTestId('display').textContent).toBe('11');
    expect(utils.getByTestId('history').childNodes[0].childNodes[0].textContent).toBe('7+4');
    expect(utils.getByTestId('history').childNodes[0].childNodes[1].textContent).toBe('= 11');
  })

  it('history 클릭', () => {
    const utils = render(<Calculator/>);
    expect(utils.getByTestId('display').textContent).toBe('');
    let btn_7 = utils.getByText('7');
    let btn_4 = utils.getByText('4');
    let plus = utils.getByText('+');

    act(() => {fireEvent.click(btn_7);});
    act(() => {fireEvent.click(plus);});
    act(() => {fireEvent.click(btn_4);});
    expect(utils.getByTestId('display').textContent).toBe('7+4');

    act(() => {fireEvent.click(utils.getByText('='));});
    expect(utils.getByTestId('display').textContent).toBe('11');
    act(() => {fireEvent.click(utils.getByTestId('history').childNodes[0]);});
    expect(utils.getByTestId('display').textContent).toBe('7+4');
  })

  it('√ history 클릭', () => {
    const utils = render(<Calculator/>);
    expect(utils.getByTestId('display').textContent).toBe('');
    let btn_9 = utils.getByText('9');
    let root = utils.getByText('√');

    act(() => {fireEvent.click(btn_9);});
    act(() => {fireEvent.click(root);});
    expect(utils.getByTestId('display').textContent).toBe('3');
    act(() => {fireEvent.click(utils.getByTestId('history').childNodes[0]);});
    expect(utils.getByTestId('display').textContent).toBe('√(9)');
  })

  it('√ history 클릭 이후 = 재실행', () => {
    const utils = render(<Calculator/>);
    expect(utils.getByTestId('display').textContent).toBe('');
    let btn_9 = utils.getByText('9');
    let root = utils.getByText('√');

    act(() => {fireEvent.click(btn_9);});
    act(() => {fireEvent.click(root);});
    expect(utils.getByTestId('display').textContent).toBe('3');
    act(() => {fireEvent.click(utils.getByTestId('history').childNodes[0]);});
    expect(utils.getByTestId('display').textContent).toBe('√(9)');
    act(() => {fireEvent.click(utils.getByText('='));});
    expect(utils.getByTestId('display').textContent).toBe('3');
  })

  it('√ history 클릭 이후 √ 재실행', () => {
    const utils = render(<Calculator/>);
    expect(utils.getByTestId('display').textContent).toBe('');
    let btn_1 = utils.getByText('1');
    let btn_6 = utils.getByText('6');
    let root = utils.getByText('√');

    act(() => {fireEvent.click(btn_1);});
    act(() => {fireEvent.click(btn_6);});
    act(() => {fireEvent.click(root);});
    expect(utils.getByTestId('display').textContent).toBe('4');
    act(() => {fireEvent.click(utils.getByTestId('history').childNodes[0]);});
    expect(utils.getByTestId('display').textContent).toBe('√(16)');
    act(() => {fireEvent.click(root);});
    expect(utils.getByTestId('display').textContent).toBe('2');
    expect(utils.getByTestId('history').childNodes[0].childNodes[0].textContent).toBe('√(√(16))');
    expect(utils.getByTestId('history').childNodes[0].childNodes[1].textContent).toBe('= 2');
    expect(utils.getByTestId('history').childNodes[1].childNodes[0].textContent).toBe('√(16)');
    expect(utils.getByTestId('history').childNodes[1].childNodes[1].textContent).toBe('= 4');
  })
})
