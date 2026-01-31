package com.tennis.management.entity.enums;

public enum SkillLevel {
    A_PLUS("A+"),
    A("A"),
    B("B"),
    C("C"),
    D("D");
    
    private final String displayName;
    
    SkillLevel(String displayName) {
        this.displayName = displayName;
    }
    
    public String getDisplayName() {
        return displayName;
    }
}
