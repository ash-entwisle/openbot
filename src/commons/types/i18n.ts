interface ITestGroup {
    test(): void;
    echo(message: string): string;
}

interface IMessages {
    TestGroup: ITestGroup;  
}

interface II18n {
    [key: string]: IMessages;
}