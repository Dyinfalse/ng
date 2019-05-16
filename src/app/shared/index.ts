// Components

// Utils
export * from './utils/yuan';

// Module
export * from './shared.module';

/**
 * 公共配置类
 */
class AppConfigClass {
    /**
     * 模态框宽度
     */
    ModalWidth:number = 800;
}

export const AppConfig = new AppConfigClass();
