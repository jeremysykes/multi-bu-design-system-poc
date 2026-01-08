import { z } from 'zod';
import { Theme } from '@mui/material/styles';

declare const dtcgTokenSchema: z.ZodObject<{
    $schema: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
        $value: z.ZodAny;
        $type: z.ZodOptional<z.ZodString>;
        $description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        $value?: any;
        $type?: string | undefined;
        $description?: string | undefined;
    }, {
        $value?: any;
        $type?: string | undefined;
        $description?: string | undefined;
    }>, z.ZodRecord<z.ZodString, z.ZodAny>]>>>;
    typography: z.ZodOptional<z.ZodObject<{
        fontFamily: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            $value: z.ZodAny;
            $type: z.ZodOptional<z.ZodString>;
            $description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        }, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        }>, z.ZodRecord<z.ZodString, z.ZodAny>]>>>;
        fontSize: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            $value: z.ZodAny;
            $type: z.ZodOptional<z.ZodString>;
            $description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        }, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        }>, z.ZodRecord<z.ZodString, z.ZodAny>]>>>;
        fontWeight: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            $value: z.ZodAny;
            $type: z.ZodOptional<z.ZodString>;
            $description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        }, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        }>, z.ZodRecord<z.ZodString, z.ZodAny>]>>>;
        lineHeight: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            $value: z.ZodAny;
            $type: z.ZodOptional<z.ZodString>;
            $description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        }, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        }>, z.ZodRecord<z.ZodString, z.ZodAny>]>>>;
    }, "strip", z.ZodTypeAny, {
        fontFamily?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        fontSize?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        fontWeight?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        lineHeight?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
    }, {
        fontFamily?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        fontSize?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        fontWeight?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        lineHeight?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
    }>>;
    spacing: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
        $value: z.ZodAny;
        $type: z.ZodOptional<z.ZodString>;
        $description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        $value?: any;
        $type?: string | undefined;
        $description?: string | undefined;
    }, {
        $value?: any;
        $type?: string | undefined;
        $description?: string | undefined;
    }>, z.ZodRecord<z.ZodString, z.ZodAny>]>>>;
    shape: z.ZodOptional<z.ZodObject<{
        borderRadius: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            $value: z.ZodAny;
            $type: z.ZodOptional<z.ZodString>;
            $description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        }, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        }>, z.ZodRecord<z.ZodString, z.ZodAny>]>>>;
        elevation: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            $value: z.ZodAny;
            $type: z.ZodOptional<z.ZodString>;
            $description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        }, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        }>, z.ZodRecord<z.ZodString, z.ZodAny>]>>>;
    }, "strip", z.ZodTypeAny, {
        borderRadius?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        elevation?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
    }, {
        borderRadius?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        elevation?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
    }>>;
    semantic: z.ZodOptional<z.ZodObject<{
        surface: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            $value: z.ZodAny;
            $type: z.ZodOptional<z.ZodString>;
            $description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        }, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        }>, z.ZodRecord<z.ZodString, z.ZodAny>]>>>;
        text: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            $value: z.ZodAny;
            $type: z.ZodOptional<z.ZodString>;
            $description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        }, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        }>, z.ZodRecord<z.ZodString, z.ZodAny>]>>>;
        border: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            $value: z.ZodAny;
            $type: z.ZodOptional<z.ZodString>;
            $description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        }, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        }>, z.ZodRecord<z.ZodString, z.ZodAny>]>>>;
        action: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            $value: z.ZodAny;
            $type: z.ZodOptional<z.ZodString>;
            $description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        }, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        }>, z.ZodRecord<z.ZodString, z.ZodAny>]>>>;
        feedback: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            $value: z.ZodAny;
            $type: z.ZodOptional<z.ZodString>;
            $description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        }, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        }>, z.ZodRecord<z.ZodString, z.ZodAny>]>>>;
    }, "strip", z.ZodTypeAny, {
        surface?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        text?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        border?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        action?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        feedback?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
    }, {
        surface?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        text?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        border?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        action?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        feedback?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    $schema?: string | undefined;
    color?: Record<string, {
        $value?: any;
        $type?: string | undefined;
        $description?: string | undefined;
    } | Record<string, any>> | undefined;
    typography?: {
        fontFamily?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        fontSize?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        fontWeight?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        lineHeight?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
    } | undefined;
    spacing?: Record<string, {
        $value?: any;
        $type?: string | undefined;
        $description?: string | undefined;
    } | Record<string, any>> | undefined;
    shape?: {
        borderRadius?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        elevation?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
    } | undefined;
    semantic?: {
        surface?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        text?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        border?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        action?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        feedback?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
    } | undefined;
}, {
    $schema?: string | undefined;
    color?: Record<string, {
        $value?: any;
        $type?: string | undefined;
        $description?: string | undefined;
    } | Record<string, any>> | undefined;
    typography?: {
        fontFamily?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        fontSize?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        fontWeight?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        lineHeight?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
    } | undefined;
    spacing?: Record<string, {
        $value?: any;
        $type?: string | undefined;
        $description?: string | undefined;
    } | Record<string, any>> | undefined;
    shape?: {
        borderRadius?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        elevation?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
    } | undefined;
    semantic?: {
        surface?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        text?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        border?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        action?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
        feedback?: Record<string, {
            $value?: any;
            $type?: string | undefined;
            $description?: string | undefined;
        } | Record<string, any>> | undefined;
    } | undefined;
}>;
type DTCGTokenSchema = z.infer<typeof dtcgTokenSchema>;

type TokenSchema = DTCGTokenSchema;

/**
 * Builds a MUI theme from DTCG token data
 * Pure function - no side effects, stateless, deterministic
 *
 * @param tokens - DTCG token schema data
 * @returns Compiled MUI theme
 */
declare function buildTheme(tokens: TokenSchema): Theme;

/**
 * Browser-compatible token loader
 * Uses static imports instead of fs/promises for browser compatibility
 */

/**
 * Loads tokens for a business unit (browser-compatible)
 *
 * All BUs use DTCG format tokens.json files
 * BU tokens are merged with core tokens so references like {color.error-500} can resolve
 *
 * Note: This function is intentionally async for future dynamic loading support.
 * Currently returns statically imported tokens, but the async API enables
 * potential future features like lazy loading, network fetching, or dynamic token updates.
 *
 * @param buId - Business unit identifier (e.g., 'core', 'bu-a', 'bu-b', 'bu-c', 'bu-d')
 * @returns Token data in DTCG format (merged with core if not 'core')
 */
declare function loadTokens$1(buId: string): Promise<TokenSchema>;

/**
 * Loads tokens for a business unit (DTCG format)
 *
 * For all tokens: Loads from tokens/{bu}/tokens.json in DTCG format
 * BU tokens are merged with core tokens so references like {color.error-500} can resolve
 *
 * @param buId - Business unit identifier (e.g., 'core', 'bu-a', 'bu-b', 'bu-c', 'bu-d')
 * @returns Token data in DTCG format (merged with core if not 'core')
 */
declare function loadTokens(buId: string): Promise<TokenSchema>;

/**
 * Validates tokens against the DTCG schema
 * @param tokens - Token data to validate
 * @returns Validation result with errors if any
 */
declare function validateTokens(tokens: unknown): {
    valid: boolean;
    errors: Array<{
        path: string;
        message: string;
    }>;
};

export { type TokenSchema, buildTheme, loadTokens$1 as loadTokens, loadTokens as loadTokensNode, validateTokens };
