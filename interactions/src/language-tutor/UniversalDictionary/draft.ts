//#export 652d77c65674c387e10594bd 65314ef978cf8f17f35dfeba @2024-02-28T17:58:46.907Z
// This is a generated file. Do not edit.

import { StudioClient, StudioClientProps, InteractionBase } from "@composableai/sdk";

/**
 * Universal Dictionary input type
 */
export interface UniversalDictionaryProps {
    word: string;
    study_language: string;
    user_language: string;
    content: string;
}

/**
 * Universal Dictionary result type
 */
export interface UniversalDictionaryResult {
    word?: string;
    /**
     * The word in kana if word is in Japanese language
     */
    word_kana?: string;
    /**
     * Does the word exist?
     */
    exists?: boolean;
    /**
     * The language of the word
     */
    language?: string;
    /**
     * The language of the definition
     */
    definitionLanguage?: string;
    /**
     * required: the pronounciation of the word in a way the user can read in its language and the phonetic transcription in parenthesis like ta-te-mo-no (phonetic transcription)
     */
    pronounciation?: string;
    /**
     * The corrected word if the word is misspelled
     */
    corrected_word?: string;
    /**
     * The part of speech of the word
     */
    part_of_speech?: string;
    /**
     * The morphological characteristics, for example: tense, conjugaison, plural, etc.
     */
    morphological_characteristics?: string;
    /**
     * The normalized form of the word, for example infinitive for verb, canonical for for plurals, etc.
     */
    normalized_form?: string;
    /**
     * The normalized form in kana if word is in Japanese language
     */
    normalized_form_kana?: string;
    senses?: {
        language?: string;
        translation?: string;
        definition?: string;
        example?: string;
        synonyms?: string;
        language_level?: string;
        appropriate_use?: string;
    }[];
}

/**
 * Universal Dictionary
 */
export class UniversalDictionary extends InteractionBase<UniversalDictionaryProps, UniversalDictionaryResult> {
    readonly projectId = "652d77c65674c387e10594bd";
    constructor(clientOrProps: StudioClient | StudioClientProps) {
        super ("65314ef978cf8f17f35dfeba", clientOrProps);
        this.client.project = this.projectId;
    }
}
