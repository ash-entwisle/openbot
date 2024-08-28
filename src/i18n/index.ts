interface ITestGroup {
    test(): string;
    echo(message: string): string;
}

interface IMessages {
    TestGroup: ITestGroup;  
}

interface II18n {
    [key: string]: IMessages;
}
/*
    Supported Languages: 
    - id (Indonesian)
    - da (Danish)
    - de (German)
    - en-GB (English UK)
    - en-US (English US)
    - es-ES (Spanish Spain)
    - es-419 (Spanish Latin America)
    - fr (French)
    - hr (Croatian)
    - it (Italian)
    - lt (Lithuanian)
    - hu (Hungarian)
    - nl (Dutch)
    - no (Norwegian)
    - pl (Polish)
    - pt-BR (Portuguese Brazil)
    - ro (Romanian)
    - fi (Finnish)
    - sv-SE (Swedish)
    - vi (Vietnamese)
    - tr (Turkish)
    - cs (Czech)
    - el (Greek)
    - bg (Bulgarian)
    - ru (Russian)
    - uk (Ukrainian)
    - hi (Hindi)
    - th (Thai)
    - zh-CN (Chinese Simplified)
    - ja (Japanese)
    - zh-TW (Chinese Traditional)
    - ko (Korean)
*/

// make default class that implements IMessages
export class DefaultTestMessages implements ITestGroup {
    test(): string {
        return "Test";
    }
    echo(message: string): string {
        return message;
    }
}

export const Default: IMessages = {
    TestGroup: new DefaultTestMessages()
}


export const I18N: II18n = {
    "id":       Default,
    "da":       Default,
    "de":       Default,
    "en-GB":    Default,
    "en-US":    Default,
    "es-ES":    Default,
    "es-419":   Default,
    "fr":       Default,
    "hr":       Default,
    "it":       Default,
    "lt":       Default,
    "hu":       Default,
    "nl":       Default,
    "no":       Default,
    "pl":       Default,
    "pt-BR":    Default,
    "ro":       Default,
    "fi":       Default,
    "sv-SE":    Default,
    "vi":       Default,
    "tr":       Default,
    "cs":       Default,
    "el":       Default,
    "bg":       Default,
    "ru":       Default,
    "uk":       Default,
    "hi":       Default,
    "th":       Default,
    "zh-CN":    Default,
    "ja":       Default,
    "zh-TW":    Default,
    "ko":       Default
}
