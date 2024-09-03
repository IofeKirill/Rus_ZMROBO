import * as vscode from 'vscode';

class CommandTreeItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        private readonly commandId: string | undefined,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly children: CommandTreeItem[] = []
    ) {
        super(label, collapsibleState);
        if (commandId) {
            this.command = {
                command: commandId,
                title: this.label,
            };
        }
        this.tooltip = new vscode.MarkdownString(this.getDescription());
    }

    private getDescription(): string {
        switch (this.label) {
            case 'SetMotor()':
                return 'Команда для установки скорости мотора. Первый параметр - № мотора, второй параметр - скорость от -100 до 100.';
            case 'SetMotorCode()':
                return 'Обнуление энкодера. Параметр - № мотора.';
            case 'GetMotorCode()':
                return 'Получение показаний с энкодера. Параметр - № мотора.';
            case 'SetMotorServo()':
                return 'Установка мотора в определенное положение с указанной скоростью. Параметры: порт, скорость, угол.';
            case 'SetWaitForAngle()':
                return 'Ожидание положения мотора в определенном положении с указанной скоростью. Параметры: порт, скорость, угол.';
            case 'SetMotorStraightAngle()':
                return 'Синхронный запуск двух моторов с указанной скоростью до определенного положения. Параметры: порт1, порт2, скорость, угол.';
            case 'SetCarTurn()':
                return 'Синхронный запуск двух моторов с указанной скоростью до определенного положения в противоположных направлениях. Параметры: порт1, порт2, скорость, угол.';
            case 'SetMotorStraight()':
                return 'Синхронный запуск двух моторов с указанной скоростью. Параметры: порт1, порт2, скорость.';
            case 'SetMotorStraightTurn()':
                return 'Синхронный запуск двух моторов с указанной скоростью до определенного положения робота в градусах. Параметры: порт1, порт2, скорость, угол.';
            case 'SetMotorPower()':
                return 'Запуск сразу четырех моторов с указанными скоростями. Параметры: скорость1, скорость2, скорость3, скорость4.';
            
            case 'SetInSound()':
                return 'Установка частоты звука в Гц. Параметры: частота в Гц, длительность в мс.';
            case 'SetData()':
                return 'Запись данных по адресу. Параметры: адрес, данные.';
            case 'GetData()':
                return 'Чтение данных по адресу. Параметр: адрес.';
            case 'SetUartData()':
                return 'Отправка Serial-данных. Параметры: порт (обычно 255), скорость в бод (обычно 9600).';
            case 'GetUartData()':
                return 'Получение Serial-данных. Параметр: скорость в бод (обычно 9600).';
            case 'SetInBeep()':
                return 'Включение/выключение зуммера. Параметр: 0 - выключить, 1 - включить.';
            case 'GetInMic()':
                return 'Чтение уровня громкости микрофона.';
            case 'GetInVoltage()':
                return 'Чтение уровня напряжения батареи.';
            case 'GGetLeftButton()':
                return 'Чтение состояния левой кнопки.';
            case 'GetRightButton()':
                return 'Чтение состояния правой кнопки.';    

            case 'Wait':
                return 'Таймер в секундах. 1 мс = 0.001.';

            case 'Set3CLED()':
                return 'Управление лампой. Параметры: порт, цвет (0-7). Цвета: Выкл, Красный, Зеленый, Синий, Жёлтый, Фиолетовый, Голубой, Белый.';
            case 'GetTouch()':
                return 'Проверка нажатия кнопки. Параметр: порт.';
            case 'SetLightSensorLED()':
                return 'Включение/выключение подсветки на датчике света. Параметры: порт, 0/1.';
            case 'GetLightSensorData()':
                return 'Получение показаний датчика света ниже порогового значения. Параметр: порт.';
            case 'GetLightSensor()':
                return 'Получение показаний с датчика света (от 0 - чёрный, до 100 - белый). Параметр: порт.';
            case 'GetUltrasound()':
                return 'Получение показаний с УЗ датчика расстояния (в см). Параметр: порт.';
            case 'GetColorSensor()':
                return 'Получение показаний с датчика цвета. Параметры: порт, режим. Режимы: 1-G, 2-R, 3-B, 4-Color, 9-Light, 15-Hue, 16-Saturation, 17-Luminance.';
            case 'GetShortIRDist()':
                return 'Получение показаний с ИК датчика расстояния. Параметр: порт.';
            case 'GetLaserDist()':
                return 'Получение показаний с лазерного датчика расстояния (в мм). Параметры: порт, режим (обычный/большая дальность).';
            case 'SetAHRS()':
                return 'Калибровка гироскопа. Параметры: порт, режим (1 работает, 2 нет).';
            case 'GetAHRS()':
                return 'Получение показаний с гироскопа. Параметры: порт, режим, ось. Режимы: 1-крен, 2-наклон, 3-рысканье, 4-aX, 5-aY, 6-aZ, 7-gX, 8-gY, 9-gZ.';
            case 'GetTraceV2I2C()':
                return 'Получение показаний с линейки датчиков света. Параметры: порт, целевой датчик.';
            case 'GetTraceV2I2CState()':
                return 'Проверка состояний с линейки датчиков. Параметры: порт, целевой датчик (1-7).';
            case 'GetTraceV2I2CChxState()':
                return 'Проверка обнаружения чёрной линии различными датчиками. Параметры: порт, состояния.';
            case 'SetTraceV2I2AllColor()':
                return 'Включение подсветки на всей линейке датчиков. Параметры: порт, цвет.';
            case 'SetTraceV2I2Color()':
                return 'Включение подсветки на каждом из датчиков линейки. Параметры: порт, цвета для каждого датчика.';
            case 'SetTraceV2I2Threshold()':
                return 'Автоматическая установка порога на заданное время. Параметры: порт, время (сек).';
            case 'SetTraceV2I2CLineColor()':
                return 'Автоматический поиск линии по цвету (чёрный/белый). Параметры: порт, цвет (0/1).';

            case 'PlayMP3()':
                return 'Проиграть звук. Параметры: папка, файл. В папке 1 есть 14 встроенных звуков. Можно создавать свои папки и загружать свои звуки.';
            case 'SuspendMP3()':
                return 'Остановить музыку.';
            case 'SetMP3Volume()':
                return 'Установка громкости. Параметр: громкость (0-28).';
            
            case 'GetTouchScreen()':
                return 'Проверка касания экрана.';
            case 'GetTouchScreenX()':
                return 'Получение X-координаты касания экрана.';
            case 'GetTouchScreenY()':
                return 'Получение Y-координаты касания экрана.';
            case 'ClearLCD()':
                return 'Очистка экрана выбранным цветом. Параметр: цвет в шестнадцатиричной системе.';
            case 'SetFontSize()':
                return 'Установка размера шрифта. Параметр: размер (0-4).';
            case 'DisplayVar()':
                return 'Вывод числа в строке. Параметры: строка, число, цвет текста, цвет фона.';
            case 'DisplayString()':
                return 'Вывод текста в строке. Параметры: строка, "текст", цвет текста, цвет фона. Вместо текста могут быть и числа. Пример: rcu.SetDisplayString(1,str(5 + 3),0xFFE0,0x0000). Пример2 : rcu.SetDisplayString(1,str("".join(("Speed = ",str(50)))),0xFFE0,0x0000)';
            case 'DisplayPicture()':
                return 'Вывод картинки на экран в заданных координатах. Параметры: x, y, картинка, масштаб.';
            case 'DisplayVarXY()':
                return 'Вывод числа на экран в заданных координатах. Параметры: x, y, число, цвет текста, цвет фона.';
            case 'DisplayStringXY()':
                return 'Вывод текста на экран в заданных координатах. Параметры: x, y, "текст", цвет текста, цвет фона.';
            case 'DisplayVarU32()':
                return 'Вывод 10-значного числа на экран в строке. Параметры: строка, число, цвет текста, цвет фона.';
            case 'DrawDot()':
                return 'Нарисовать точку по координатам. Параметры: x, y, цвет.';
            case 'DrawSolidCircle()':
                return 'Нарисовать круг по координатам. Параметры: x, y, радиус, цвет.';
            case 'DrawLine()':
                return 'Нарисовать линию по координатам. Параметры: x, y, угол, длина, цвет.';
            case 'DrawFilledRectangle()':
                return 'Нарисовать сплошной прямоугольник по координатам. Параметры: x, y, ширина, высота, цвет.';
            case 'DrawRectangle()':
                return 'Нарисовать прямоугольник по координатам. Параметры: x, y, ширина, высота, толщина линии, цвет.';
        
            case 'SetBluetoothData()':
                return 'Передать данные с контроллера. Параметр: данные.';
            case 'GetBluetoothData()':
                return 'Получить данные по Bluetooth.';
            case 'GetBluetoothControl()':
                return 'Получить код ключа телефона.';
            case 'GetBluetoothControlData()':
                return 'Получить ключ телефона.';
            case 'GetBTModuleRemoteButton()':
                return 'Получить значение ключа Bluetooth-пульта.';
            case 'GetBTModuleRemoteCode()':
                return 'Получить код ключа Bluetooth-пульта.';
            case 'GetBTModuleRemoteRocker()':
                return 'Получить направление джойстика Bluetooth-пульта. Параметры: направление (0/1), ось (0/1).';
            case 'GetComVoice()':
                return 'Голосовая команда. Параметр: текст.';

            case 'SetAICamData()':
                return 'Переключить камеру в режим 0-14 или выполнить другие задачи, такие как распознавание цвета, обучение распознаванию изображений и т.д.';
            case 'SetWaitForAICamData()':
                return 'Ожидание переключения камеры в установленный режим.';
            case 'SetAICamLED()':
                return 'Включение/выключение подсветки на камере.';
            case 'GetAICamVoice()':
                return 'Получить инструкции по распознаванию голоса. Параметр: № инструкции.';
            case 'GetAICamData(':
                return 'получить показания в режимах 0-14.';
                
    
            default:
                return '';
        }
    }
}

class CommandTreeProvider implements vscode.TreeDataProvider<CommandTreeItem> {
    getTreeItem(element: CommandTreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: CommandTreeItem): Thenable<CommandTreeItem[]> {
        if (element === undefined) {
            return Promise.resolve(this.getRootElements());
        }
        return Promise.resolve(element.children);
    }

    getRootElements(): CommandTreeItem[] {
        return [
            new CommandTreeItem('Новый файл', 'extension.createPythonTemplateWithPrompt', vscode.TreeItemCollapsibleState.None),
            new CommandTreeItem('Моторы', undefined, vscode.TreeItemCollapsibleState.Collapsed, [
                new CommandTreeItem('SetMotor()', 'rcu.setMotor', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('SetMotorCode()', 'rcu.SetMotorCode', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('GetMotorCode()', 'rcu.GetMotorCode', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('SetMotorServo()', 'rcu.SetMotorServo', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('SetWaitForAngle()', 'rcu.SetWaitForAngle', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('SetMotorStraightAngle()', 'rcu.SetMotorStraightAngle', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('SetCarTurn()', 'rcu.SetCarTurn', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('SetMotorStraight()', 'rcu.SetMotorStraight', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('SetMotorStraightTurn()', 'rcu.SetMotorStraightTurn', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('SetMotorPower()', 'rcu.SetMotorPower', vscode.TreeItemCollapsibleState.None)
            ]),
            new CommandTreeItem('Контроллер', undefined, vscode.TreeItemCollapsibleState.Collapsed, [
                new CommandTreeItem('SetInSound()', 'rcu.SetInSound', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('SetData()', 'rcu.SetData', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('GetData()', 'rcu.GetData', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('SetUartData()', 'rcu.SetUartData', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('GetUartData()', 'rcu.GetUartData', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('SetInBeep()', 'rcu.SetInBeep', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('GetInMic()', 'rcu.GetInMic', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('GetInVoltage()', 'rcu.GetInVotage', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('GetLeftButton()', 'rcu.GetLeftButton', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('GetRightButton()', 'rcu.GetRightButton', vscode.TreeItemCollapsibleState.None)
            ]),
            new CommandTreeItem('Датчики', undefined, vscode.TreeItemCollapsibleState.Collapsed, [
                new CommandTreeItem('Датчики света/цвета', undefined, vscode.TreeItemCollapsibleState.Collapsed, [
                    new CommandTreeItem('Set3CLED()', 'rcu.Set3CLed', vscode.TreeItemCollapsibleState.None),
                    new CommandTreeItem('SetLightSensorLED()', 'rcu.SetLightSensorLed', vscode.TreeItemCollapsibleState.None),
                    new CommandTreeItem('GetLightSensorData()', 'rcu.GetLightSensorData', vscode.TreeItemCollapsibleState.None),
                    new CommandTreeItem('GetLightSensor()', 'rcu.GetLightSensor', vscode.TreeItemCollapsibleState.None),
                    new CommandTreeItem('GetColorSensor()', 'rcu.GetColorSensor', vscode.TreeItemCollapsibleState.None)
                ]),
                new CommandTreeItem('Датчики расстояния', undefined, vscode.TreeItemCollapsibleState.Collapsed, [
                    new CommandTreeItem('GetTouch()', 'rcu.GetTouch', vscode.TreeItemCollapsibleState.None),
                    new CommandTreeItem('GetUltrasound()', 'rcu.GetUltrasound', vscode.TreeItemCollapsibleState.None),
                    new CommandTreeItem('GetShortIRDist()', 'rcu.GetShortIRDist', vscode.TreeItemCollapsibleState.None),
                    new CommandTreeItem('GetLaserDist()', 'rcu.GetLaserDist', vscode.TreeItemCollapsibleState.None)
                ]),
                new CommandTreeItem('Камера', undefined, vscode.TreeItemCollapsibleState.Collapsed, [
                    new CommandTreeItem('SetAICamData()', 'rcu.SetAICamData', vscode.TreeItemCollapsibleState.None),
                    new CommandTreeItem('SetWaitForAICamData()', 'rcu.SetWaitForAICamData', vscode.TreeItemCollapsibleState.None),
                    new CommandTreeItem('SetAICamLED()', 'rcu.SetAICamLED', vscode.TreeItemCollapsibleState.None),
                    new CommandTreeItem('GetAICamVoice()', 'rcu.GetAICamVoice', vscode.TreeItemCollapsibleState.None),
                    new CommandTreeItem('GetAICamData()', 'rcu.GetAICamData', vscode.TreeItemCollapsibleState.None),
                ]),
                new CommandTreeItem('Модуль линии', undefined, vscode.TreeItemCollapsibleState.Collapsed, [
                    new CommandTreeItem('GetTraceV2I2C()', 'rcu.GetTraceV2I2C', vscode.TreeItemCollapsibleState.None),
                    new CommandTreeItem('GetTraceV2I2CState()', 'rcu.GetTraceV2I2CState', vscode.TreeItemCollapsibleState.None),
                    new CommandTreeItem('GetTraceV2I2CChxState()', 'rcu.GetTraceV2I2CChxState', vscode.TreeItemCollapsibleState.None),
                    new CommandTreeItem('SetTraceV2I2AllColor()', 'rcu.SetTraceV2I2AllColor', vscode.TreeItemCollapsibleState.None),
                    new CommandTreeItem('SetTraceV2I2Color()', 'rcu.SetTraceV2I2Color', vscode.TreeItemCollapsibleState.None),
                    new CommandTreeItem('SetTraceV2I2Threshold()', 'rcu.SetTraceV2I2Threshold', vscode.TreeItemCollapsibleState.None),
                    new CommandTreeItem('SetTraceV2I2CLineColor()', 'rcu.SetTraceV2I2CLineColor', vscode.TreeItemCollapsibleState.None),
                ]),
                new CommandTreeItem('Гироскоп', undefined, vscode.TreeItemCollapsibleState.Collapsed, [
                    new CommandTreeItem('SetAHRS()', 'rcu.SetAHRS', vscode.TreeItemCollapsibleState.None),
                    new CommandTreeItem('GetAHRS()', 'rcu.GetAHRS', vscode.TreeItemCollapsibleState.None),
                ]),

            ]),
            new CommandTreeItem('Звуки', undefined, vscode.TreeItemCollapsibleState.Collapsed, [
                new CommandTreeItem('PlayMP3()', 'rcu.SetMp3Play', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('SuspendMP3()', 'rcu.SetMp3Suspend', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('SetMP3Volume()', 'rcu.SetMp3Sound', vscode.TreeItemCollapsibleState.None)
            ]),
            new CommandTreeItem('Экран', undefined, vscode.TreeItemCollapsibleState.Collapsed, [
                new CommandTreeItem('GetTouchScreen()', 'rcu.GetTouchScreen', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('GetTouchScreenX()', 'rcu.GetTouchScreenX', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('GetTouchScreenY()', 'rcu.GetTouchScreenY', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('ClearLCD()', 'rcu.SetLCDClear', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('SetFontSize()', 'rcu.SetFontSize', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('DisplayVar()', 'rcu.SetDisplayVar', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('DisplayString()', 'rcu.SetDisplayString', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('DisplayPicture()', 'rcu.SetDisplayPicture', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('DisplayVarXY()', 'rcu.SetDisplayVarXY', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('DisplayStringXY()', 'rcu.SetDisplayStringXY', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('DisplayVarU32()', 'rcu.SetDisplayVarU32', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('DrawDot()', 'rcu.SetLCDDot', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('DrawSolidCircle()', 'rcu.SetLCDSolidCircle', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('DrawLine()', 'rcu.SetLCDLine', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('DrawFilledRectangle()', 'rcu.SetLCDFilledRectangle2', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('DrawRectangle()', 'rcu.SetLCDRectangle2', vscode.TreeItemCollapsibleState.None)
            ]),
            new CommandTreeItem('Bluetooth', undefined, vscode.TreeItemCollapsibleState.Collapsed, [
                new CommandTreeItem('SetBluetoothData()', 'rcu.SetBluetoothData', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('GetBluetoothData()', 'rcu.GetBluetoothData', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('GetBluetoothControl()', 'rcu.GetBluetoothControl', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('GetBluetoothControlData()', 'rcu.GetBluetoothControlData', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('GetBTModuleRemoteButton()', 'rcu.GetBTModuleRemoteButton', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('GetBTModuleRemoteCode()', 'rcu.GetBTModuleRemoteCode', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('GetBTModuleRemoteRocker()', 'rcu.GetBTModuleRemoteRocker', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('GetComVoice()', 'rcu.GetComVoice', vscode.TreeItemCollapsibleState.None)
            ]),
            new CommandTreeItem('Управление', undefined, vscode.TreeItemCollapsibleState.Collapsed, [
                new CommandTreeItem('If', 'control.if', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('If-Else', 'control.ifelse', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('If-Elif-Else', 'control.ifelifelse', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('While()', 'control.while', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('While True', 'control.whiletrue', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('For()', 'control.for', vscode.TreeItemCollapsibleState.None),
                new CommandTreeItem('Wait()', 'rcu.SetWaitForTime', vscode.TreeItemCollapsibleState.None)
            ])
        ];
    }
}

export function activate(context: vscode.ExtensionContext) {
    const treeDataProvider = new CommandTreeProvider();
    vscode.window.createTreeView('rcuCommands', { treeDataProvider });

    // Регистрация команд моторов
    vscode.commands.registerCommand('rcu.setMotor', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.setMotor(${1:port}, ${2:speed})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetMotorCode', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetMotorCode(${1:port})'));
        }
    });

    vscode.commands.registerCommand('rcu.GetMotorCode', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetMotorCode(${1:port})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetMotorServo', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetMotorServo(${1:port}, ${2:speed}, ${3:angle})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetWaitForAngle', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetWaitForAngle(${1:port}, ${2:speed}, ${3:angle})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetMotorStraightAngle', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetMotorStraightAngle(${1:port1}, ${2:port2}, ${3:speed}, ${4:angle})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetCarTurn', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetCarTurn(${1:port1}, ${2:port2}, ${3:speed}, ${4:angle})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetMotorStraight', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetMotorStraight(${1:port1}, ${2:port2}, ${3:speed})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetMotorStraightTurn', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetMotorStraightTurn(${1:port1}, ${2:port2}, ${3:speed}, ${4:angle})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetMotorPower', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetMotorPower(${1:speed1}, ${2:speed2}, ${3:speed3}, ${4:speed4})'));
        }
    });

    // Регистрация команд контроллера
    vscode.commands.registerCommand('rcu.SetInSound', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetInSound(${1:1047}, ${2:500})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetData', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetData(${1:address}, ${2:data})'));
        }
    });

    vscode.commands.registerCommand('rcu.GetData', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetData(${1:address})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetUartData', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetUartData(${1:port}, ${2:speed})'));
        }
    });

    vscode.commands.registerCommand('rcu.GetUartData', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetUartData(${1:speed})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetInBeep', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetInBeep(${1:0})'));
        }
    });

    vscode.commands.registerCommand('rcu.GetInMic', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetInMic()'));
        }
    });

    vscode.commands.registerCommand('rcu.GetInVotage', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetInVotage()'));
        }
    });

    vscode.commands.registerCommand('rcu.GetLeftButton', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetLeftButton()'));
        }
    });

    vscode.commands.registerCommand('rcu.GetRightButton', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetRightButton()'));
        }
    });


    // Регистрация команд датчиков
    vscode.commands.registerCommand('rcu.Set3CLed', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.Set3CLed(${1:port}, ${2:color})'));
        }
    });

    vscode.commands.registerCommand('rcu.GetTouch', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetTouch(${1:port})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetLightSensorLed', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetLightSensorLed(${1:port}, ${2:on/off})'));
        }
    });

    vscode.commands.registerCommand('rcu.GetLightSensorData', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetLightSensorData(${1:port})'));
        }
    });

    vscode.commands.registerCommand('rcu.GetLightSensor', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetLightSensor(${1:port})'));
        }
    });

    vscode.commands.registerCommand('rcu.GetUltrasound', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetUltrasound(${1:port})'));
        }
    });

    vscode.commands.registerCommand('rcu.GetColorSensor', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetColorSensor(${1:port}, ${2:mode})'));
        }
    });

    vscode.commands.registerCommand('rcu.GetShortIRDist', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetShortIRDist(${1:port})'));
        }
    });

    vscode.commands.registerCommand('rcu.GetLaserDist', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetLaserDist(${1:port}, ${2:mode})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetAHRS', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetAHRS(${1:port}, ${2:mode})'));
        }
    });

    vscode.commands.registerCommand('rcu.GetAHRS', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetAHRS(${1:port}, ${2:mode}, ${3:axis})'));
        }
    });

    vscode.commands.registerCommand('rcu.GetTraceV2I2C', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetTraceV2I2C(${1:port}, ${2:sensor})'));
        }
    });

    vscode.commands.registerCommand('rcu.GetTraceV2I2CState', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetTraceV2I2CState(${1:port}, ${2:sensor})'));
        }
    });

    vscode.commands.registerCommand('rcu.GetTraceV2I2CChxState', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetTraceV2I2CChxState(${1:port}, ${2:state})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetTraceV2I2AllColor', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetTraceV2I2AllColor(${1:port}, ${2:color})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetTraceV2I2Color', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetTraceV2I2Color(${1:port}, ${2:color1}, ${3:color2}, ${4:color3}, ${5:color4}, ${6:color5}, ${7:color6}, ${8:color7})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetTraceV2I2Threshold', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetTraceV2I2Threshold(${1:port}, ${2:time})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetTraceV2I2CLineColor', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetTraceV2I2CLineColor(${1:port}, ${2:color})'));
        }
    });

    // Регистрация команд звука
    vscode.commands.registerCommand('rcu.SetMp3Play', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetMp3Play(${1:folder}, ${2:file})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetMp3Suspend', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetMp3Suspend()'));
        }
    });

    vscode.commands.registerCommand('rcu.SetMp3Sound', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetMp3Sound(${1:volume})'));
        }
    });

    // Регистрация команд для экрана
    vscode.commands.registerCommand('rcu.GetTouchScreen', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetTouchScreen()'));
        }
    });

    vscode.commands.registerCommand('rcu.GetTouchScreenX', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetTouchScreenX()'));
        }
    });

    vscode.commands.registerCommand('rcu.GetTouchScreenY', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetTouchScreenY()'));
        }
    });

    vscode.commands.registerCommand('rcu.SetLCDClear', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetLCDClear(${1:0x0000})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetFontSize', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetFontSize(${1:0})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetDisplayVar', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetDisplayVar(${1:line}, ${2:number}, ${3:textColor}, ${4:bgColor})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetDisplayString', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetDisplayString(${1:line}, ${2:"text"}, ${3:textColor}, ${4:bgColor})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetDisplayPicture', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetDisplayPicture(${1:x}, ${2:y}, ${3:"image.jpg"}, ${4:scale})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetDisplayVarXY', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetDisplayVarXY(${1:x}, ${2:y}, ${3:number}, ${4:textColor}, ${5:bgColor})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetDisplayStringXY', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetDisplayStringXY(${1:x}, ${2:y}, ${3:"text"}, ${4:textColor}, ${5:bgColor}, ${6:scale})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetDisplayVarU32', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetDisplayVarU32(${1:line}, ${2:number}, ${3:textColor}, ${4:bgColor})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetLCDDot', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetLCDDot(${1:x}, ${2:y}, ${3:color})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetLCDSolidCircle', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetLCDSolidCircle(${1:x}, ${2:y}, ${3:radius}, ${4:color})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetLCDLine', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetLCDLine(${1:x1}, ${2:y1}, ${3:angle}, ${4:length}, ${5:color})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetLCDFilledRectangle2', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetLCDFilledRectangle2(${1:x}, ${2:y}, ${3:width}, ${4:height}, ${5:color})'));
        }
    });

    vscode.commands.registerCommand('rcu.SetLCDRectangle2', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetLCDRectangle2(${1:x}, ${2:y}, ${3:width}, ${4:height}, ${5:thickness}, ${6:color})'));
        }
    });

    // Регистрация команд для радиосвязи (Bluetooth)
    vscode.commands.registerCommand('rcu.SetBluetoothData', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetBluetoothData(${1:data})'));
        }
    });

    vscode.commands.registerCommand('rcu.GetBluetoothData', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetBluetoothData()'));
        }
    });

    vscode.commands.registerCommand('rcu.GetBluetoothControl', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetBluetoothControl()'));
        }
    });

    vscode.commands.registerCommand('rcu.GetBluetoothControlData', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetBluetoothControlData()'));
        }
    });

    vscode.commands.registerCommand('rcu.GetBTModuleRemoteButton', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetBTModuleRemoteButton()'));
        }
    });

    vscode.commands.registerCommand('rcu.GetBTModuleRemoteCode', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetBTModuleRemoteCode()'));
        }
    });

    vscode.commands.registerCommand('rcu.GetBTModuleRemoteRocker', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetBTModuleRemoteRocker(${1:direction}, ${2:axis})'));
        }
    });

    vscode.commands.registerCommand('rcu.GetComVoice', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetComVoice(${1:"text"})'));
        }
    });

    //Команды управления
    vscode.commands.registerCommand('control.if', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('if (${1:condition}):\n\t${2:pass}'));
        }
    });

    vscode.commands.registerCommand('control.ifelse', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('if (${1:condition}):\n\t${2:pass}\nelse:\n\t${3:pass}'));
        }
    });

    vscode.commands.registerCommand('control.ifelifelse', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('if (${1:condition}):\n\t${2:pass}\nelif (${3:condition}):\n\t${4:pass}\nelse:\n\t${5:pass}'));
        }
    });

    vscode.commands.registerCommand('control.while', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('while (${1:condition}):\n\t${2:pass}'));
        }
    });

    vscode.commands.registerCommand('control.whiletrue', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('while True:\n\t${1:pass}'));
        }
    });

    vscode.commands.registerCommand('control.for', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('for ${1:count} in range(${2:10}):\n\t${3:pass}'));
        }
    });

    vscode.commands.registerCommand('rcu.SetWaitForTime', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetWaitForTime(${1:time})'));
        }
    });

    //команды камеры
    vscode.commands.registerCommand('rcu.SetAICamData', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetAICamData(${1:mode}, ${2:0})'));
        }
    });
    
    vscode.commands.registerCommand('rcu.SetWaitForAICamData', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetWaitForAICamData(${1:mode}, ${2:0})'));
        }
    });
    
    vscode.commands.registerCommand('rcu.SetAICamLED', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.SetAICamLED(${1:Light})'));
        }
    });
    
    vscode.commands.registerCommand('rcu.GetAICamData', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetAICamData(${1:mode})'));
        }
    });

    vscode.commands.registerCommand('rcu.GetAICamVoice', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new vscode.SnippetString('rcu.GetAICamVoice(${1:commandNumber})'));
        }
    });

    vscode.commands.registerCommand('extension.createPythonTemplate', () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders && workspaceFolders.length > 0) {
            const filePath = vscode.Uri.file(`${workspaceFolders[0].uri.fsPath}/main.py`);
            const initialContent = `import rcu\n\ndef task1():\n    pass\n\ntask1()\n`;

            vscode.workspace.fs.writeFile(filePath, Buffer.from(initialContent)).then(() => {
                vscode.window.showInformationMessage('Python template created!');
                vscode.workspace.openTextDocument(filePath).then(doc => {
                    vscode.window.showTextDocument(doc);
                });
            });
        } else {
            vscode.window.showErrorMessage('Please open a workspace first.');
        }
    });

    vscode.commands.registerCommand('extension.createPythonTemplateWithPrompt', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders && workspaceFolders.length > 0) {
            const fileName = await vscode.window.showInputBox({ prompt: 'Enter the name of the new Python file' });
            if (fileName) {
                const filePath = vscode.Uri.file(`${workspaceFolders[0].uri.fsPath}/${fileName}.py`);
                const initialContent = `import rcu\n\ndef task1():\n    pass\n\ntask1()\n`;
    
                vscode.workspace.fs.writeFile(filePath, Buffer.from(initialContent)).then(() => {
                    vscode.window.showInformationMessage(`Python file '${fileName}.py' created!`);
                    vscode.workspace.openTextDocument(filePath).then(doc => {
                        vscode.window.showTextDocument(doc);
                    });
                });
            } else {
                vscode.window.showErrorMessage('No file name provided.');
            }
        } else {
            vscode.window.showErrorMessage('Please open a workspace first.');
        }
    });
    
}

export function deactivate() {}
